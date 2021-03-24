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

export async function processPlaylist(job: Job) {
    var spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(await GetSpotifyToken())

    spotifyApi.getPlaylist(job.playlistId)
        .then((playlist) => {
            var totalTracks = playlist.body.tracks.total

            appStore.commit(constants.storeQueue + '/' + mutationTypes.UPDATE_PROCESS_TRACK_COUNT, totalTracks)
            appStore.commit(constants.storeQueue + '/' + mutationTypes.SET_AS_PROCESSING)

            if (job.jobType === JobTypes.SHUFFLE) {
                var trackIndexes = Array.from(Array(totalTracks).keys())
                trackIndexes = utilities.shuffle(trackIndexes)

                moveTrack(job.playlistId, 0, trackIndexes)

            } else if (job.jobType === JobTypes.REVERSE) {

            }

        })
}
async function moveTrack(playlistId: string, index: number, trackIndexes: any[]) {
    var isCancelled = appStore.getters[constants.storeQueue + '/' + getterTypes.GET_IS_CANCELLED]
    var processingPlaylist = appStore.getters[constants.storeQueue + '/' + getterTypes.GET_PROCESSING]

    if (processingPlaylist !== null && processingPlaylist !== undefined && isCancelled) {
        appStore.commit(constants.storeQueue + '/' + mutationTypes.REMOVE_CURRENT_PROCESSING)

    } else {
        try {
            var spotifyApi = new SpotifyWebApi()
            spotifyApi.setAccessToken(await GetSpotifyToken())
    
            var result = spotifyApi.reorderTracksInPlaylist(playlistId, index, trackIndexes[index], { })
    
            result                
                .then(function(data) {
                    if (data.statusCode === 200) {
                        appStore.commit(constants.storeQueue + '/' + mutationTypes.UPDATE_PROGRESS, (index / trackIndexes.length) * 100)
                        
                        if ((index + 1) < trackIndexes.length) {
                            moveTrack(playlistId, index + 1, trackIndexes);
    
                        } else {
                            appStore.commit(constants.storeQueue + '/' + mutationTypes.REMOVE_CURRENT_PROCESSING)
    
                        }

                    } else {
                        setTimeout(function() {
                            moveTrack(playlistId, index, trackIndexes)            
                        }, 5000)
                    }
                }, 
                function(err) {
                    setTimeout(function() {
                        moveTrack(playlistId, index, trackIndexes)            
                    }, 5000)
                })

        } catch (err) {
            setTimeout(function() {
                moveTrack(playlistId, index, trackIndexes)            
            }, 5000)
        }

        
    }
}

// async function processSpotifyShuffleMoveTrack(playlistId: string, index: number, trackIndexes: any[]) {
//     if (state.data.processing != null && state.data.processing.cancelProcessing === true) {
//         state.clearProcessing();
//         isProcessing = false;

//     } else {
//         console.log('Moving track ' + index + ' to position ' + trackIndexes[index]);
//         try {
//             var result = Spotify_movePlaylistTrack(playlistId, index, trackIndexes[index]);
//             result.then(function(data) {
//                 console.log(data);
    
//                 if (data.statusCode == 200) {
//                     state.updateProcessingProgress((index / trackIndexes.length) * 100);
    
//                     if ((index + 1) < trackIndexes.length) {
//                         processSpotifyShuffleMoveTrack(playlistId, index + 1, trackIndexes);
    
//                     } else {
//                         state.clearProcessing();
//                         isProcessing = false;
    
//                     }
    
//                 } else {
//                     setTimeout(processSpotifyShuffleMoveTrack(playlistId, index, trackIndexes), 5000);
//                 }
    
//             }, function(err) {
//                 console.log(err);
//                 setTimeout(processSpotifyShuffleMoveTrack(playlistId, index, trackIndexes), 5000);
//             });
            
//         } catch (err) {
//             setTimeout(processSpotifyShuffleMoveTrack(playlistId, index, trackIndexes), 5000);
    
//         }
//     }
// }

export async function shufflePlaylist() {


}

export async function reversePlaylist() {
    var spotifyApi = new SpotifyWebApi()
    var token = await GetSpotifyToken()
}
