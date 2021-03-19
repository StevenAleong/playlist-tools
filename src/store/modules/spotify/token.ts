import * as types from '../../mutation-types'
import { Commit } from 'vuex'

const spotifyScopes = 'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative'

export interface Token {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token: string
}

const initState: Token = {
    access_token: '',
    token_type: '',
    scope: spotifyScopes,
    expires_in: 0,
    refresh_token: ''
}

const getters = {
    getAccessToken (state: Token) {
        return state.access_token
    },

    getRefreshToken (state: Token) {
        return state.refresh_token
    },

    getExpiryTime (state: Token) {
        return state.expires_in
    }
    
}

const actions = {
    refreshToken(context: { commit: Commit; state: Token }) {

    }
}

const mutations = {
    [types.SET_USER_TOKEN](state: Token, payload: Token) {
        state = payload
    },

    [types.UPDATE_USER_TOKEN](state: Token, payload: string) {
        state.access_token = payload
    }
}

export default {
    namespaced: true,
    state: () => initState,
    getters,
    actions,
    mutations,
}

