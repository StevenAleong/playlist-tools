import constants from '../constants'
import * as getterTypes from '../store/getter-types'
import * as mutationTypes from '../store/mutation-types'
import moment from 'moment'
import SpotifyWebApi from 'spotify-web-api-node'
import appStore from '../store'

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