import constants, { JobTypes } from '../constants'
import * as getterTypes from '../store/getter-types'
import * as mutationTypes from '../store/mutation-types'
import moment from 'moment'
import SpotifyWebApi from 'spotify-web-api-node'
import appStore from '../store'
import { Job } from '../models'
import utilities from '../utilities'

async function GetSpotifyToken() {
    var minutesLeft = appStore.getters[constants.storeSpotifyToken + '/' + getterTypes.GET_TOKEN_MINUTES_REMAINING]
    
    if (minutesLeft < 5) {
        // Refresh the token
        await refreshSpotifyLogin()
    }

    var accessToken = appStore.getters[constants.storeSpotifyToken + '/' + getterTypes.GET_TOKEN]

    return accessToken
}

export async function refreshSpotifyLogin() {
    var refreshToken = appStore.getters[constants.storeSpotifyToken + '/' + getterTypes.GET_REFRESH_TOKEN]

    await fetch(constants.spotifyRefreshUrl + '?refresh=' + refreshToken)
        .then(response => response.json())
        .then(function (tokenObj) {

            if (tokenObj.refresh != null && tokenObj.refresh.length > 0) {
                var tokenInfo = {
                    accessToken: tokenObj.access,
                    refreshToken: tokenObj.refresh,
                    expiresOn: moment(tokenObj.expires, "YYYY-MM-DD HH:mm:ss Z")
                }

                appStore.commit(constants.storeSpotifyToken + '/' + mutationTypes.SET_USER_TOKEN, tokenInfo)

            } else {
                var tokenInfo = {
                    accessToken: tokenObj.access,
                    refreshToken: tokenObj.refresh,
                    expiresOn: moment(tokenObj.expires, "YYYY-MM-DD HH:mm:ss Z")
                }

                appStore.commit(constants.storeSpotifyToken + '/' + mutationTypes.UPDATE_USER_TOKEN, tokenInfo)
                
            }   
        })
}

export async function getUserInformation() {
    var spotifyApi = new SpotifyWebApi()
    var token = await GetSpotifyToken()

    if (token != null) {
        spotifyApi.setAccessToken(token)
        return spotifyApi.getMe()
    }

    return null
}

export async function getUserPlaylists(limit: number = 50, page: number = 1) {
    if (page < 1) page = 1
    var offset = (page * limit) - limit

    var spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(await GetSpotifyToken())
    
    return spotifyApi.getUserPlaylists({ limit: limit, offset: offset })
}

let errorCount = 0;
const maxErrorCount = 5;

export async function processPlaylist(job: Job) {
    var spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(await GetSpotifyToken())

    spotifyApi.getPlaylist(job.playlistId)
        .then((playlist) => {
            var totalTracks = playlist.body.tracks.total

            appStore.commit(constants.storeQueue + '/' + mutationTypes.UPDATE_PROCESS_TRACK_COUNT, totalTracks)
            appStore.commit(constants.storeQueue + '/' + mutationTypes.SET_AS_PROCESSING)

            errorCount = 0;

            if (job.jobType === JobTypes.SHUFFLE) {
                var trackIndexes = Array.from(Array(totalTracks).keys())
                trackIndexes = utilities.shuffle(trackIndexes)

                shufflePlaylist(job.playlistId, 0, trackIndexes)

            } else if (job.jobType === JobTypes.REVERSE) {
                reversePlaylist(job.playlistId, 0, true)

            }

        })
}


async function shufflePlaylist(playlistId: string, index: number, trackIndexes: any[]) {
    var isCancelled = appStore.getters[constants.storeQueue + '/' + getterTypes.GET_IS_CANCELLED]
    var processingPlaylist = appStore.getters[constants.storeQueue + '/' + getterTypes.GET_PROCESSING]

    if (processingPlaylist === null || processingPlaylist === undefined || isCancelled || errorCount > maxErrorCount) {
        appStore.commit(constants.storeQueue + '/' + mutationTypes.REMOVE_CURRENT_PROCESSING)
        return
    } 
    
    try {
        var spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(await GetSpotifyToken())

        var result = spotifyApi.reorderTracksInPlaylist(playlistId, index, trackIndexes[index], { })

        result                
            .then(function(data) {
                if (data.statusCode === 200) {
                    appStore.commit(constants.storeQueue + '/' + mutationTypes.UPDATE_PROGRESS, (index / trackIndexes.length) * 100)
                    
                    if ((index + 1) < trackIndexes.length) {
                        shufflePlaylist(playlistId, index + 1, trackIndexes);

                    } else {
                        appStore.commit(constants.storeQueue + '/' + mutationTypes.REMOVE_CURRENT_PROCESSING)

                    }

                } else {
                    errorCount++;
                    setTimeout(function() {
                        shufflePlaylist(playlistId, index, trackIndexes)            
                    }, 5000)
                }
            }, 
            function(err) {
                errorCount++;
                setTimeout(function() {
                    shufflePlaylist(playlistId, index, trackIndexes)            
                }, 5000)
            })

    } catch (err) {
        setTimeout(function() {
            shufflePlaylist(playlistId, index, trackIndexes)            
        }, 5000)
    }
}

async function reversePlaylist(playlistId: string, index: number, forward: boolean) {
    var isCancelled = appStore.getters[constants.storeQueue + '/' + getterTypes.GET_IS_CANCELLED]
    var processingPlaylist = appStore.getters[constants.storeQueue + '/' + getterTypes.GET_PROCESSING]

    if (processingPlaylist === null || processingPlaylist === undefined || isCancelled || errorCount > maxErrorCount) {
        appStore.commit(constants.storeQueue + '/' + mutationTypes.REMOVE_CURRENT_PROCESSING)
        return
    }

    var totalTracks = processingPlaylist.totalTracks

    try {
        var spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(await GetSpotifyToken())

        var fromSpot = forward ? index : totalTracks - index - 2,
            toSpot = forward ? totalTracks - index : index

        var result = spotifyApi.reorderTracksInPlaylist(playlistId, fromSpot, toSpot, { })

        result
            .then(function(data) {
                if (data.statusCode == 200) {

                    if (!forward) {
                        if (index >= Math.floor(totalTracks / 2)) {
                            appStore.commit(constants.storeQueue + '/' + mutationTypes.REMOVE_CURRENT_PROCESSING)
                            return
                        }
                        
                        appStore.commit(constants.storeQueue + '/' + mutationTypes.UPDATE_PROGRESS, (index / (totalTracks / 2)) * 100)
                    }

                    reversePlaylist(playlistId, forward ? index : index + 1, forward ? false : true)

                } else {
                    setTimeout(function() {
                        reversePlaylist(playlistId, index, forward)            
                    }, 5000)

                }
            },
            function(err) {
                errorCount++;
                setTimeout(function() {
                    reversePlaylist(playlistId, index, forward)            
                }, 5000)

            })


        // if (forward) {
        //     //console.log('Moving track from ' + index  + ' to ' + (totalTracks - index));
            

        //     var result = Spotify_movePlaylistTrack(playlistId, index, totalTracks - index);

        //     result.then(function(data) {
        //         if (data.statusCode == 200) {
        //             processSpotifyReverse(playlistId, index, false);
        //         } else {
        //             setTimeout(processSpotifyReverse(playlistId, index, forward), 5000);
        //         }
        //     });

        // } else {
        //     console.log('Moving track from ' + (totalTracks - index - 2) + ' to ' + index);
        //     var result2 = Spotify_movePlaylistTrack(playlistId, totalTracks - index - 2, index);
        //     result2.then(function(data2) {
        //         if (data2.statusCode == 200) {

        //             state.updateProcessingProgress((index / (totalTracks / 2)) * 100);

        //             if (index < Math.floor(totalTracks / 2)) {
        //                 processSpotifyReverse(playlistId, index + 1, true);

        //             } else {
        //                 state.clearProcessing();
        //                 isProcessing = false;

        //             }

        //         } else {
        //             setTimeout(processSpotifyReverse(playlistId, index, forward), 5000);
        //         }
        //     });
        // }

    } catch {
        errorCount++;
        setTimeout(function() {
            reversePlaylist(playlistId, index, forward)            
        }, 5000)
    }

}