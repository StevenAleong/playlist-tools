import * as mutationTypes from '../../mutation-types'
import * as getterTypes from '../../getter-types'
import { Token } from '../../../models'
import { Commit } from 'vuex'
import moment from 'moment'

const initState: Token = {
    accessToken: '',
    expiresOn: new Date(),
    refreshToken: ''
}

const getters = {
    [getterTypes.GET_TOKEN_MINUTES_REMAINING] (state: Token) {
        return moment(state.expiresOn).diff(moment(), 'minutes')
    },

    [getterTypes.GET_TOKEN] (state: Token) {
        return state.accessToken
    },

    [getterTypes.GET_REFRESH_TOKEN] (state: Token) {
        return state.refreshToken
    }
    
}

const actions = {

}

const mutations = {
    [mutationTypes.SET_USER_TOKEN](state: Token, payload: Token) {
        state.accessToken = payload.accessToken
        state.refreshToken = payload.refreshToken
        state.expiresOn = payload.expiresOn        
    },

    [mutationTypes.UPDATE_USER_TOKEN](state: Token, payload: Token) {
        state.accessToken = payload.accessToken

        if (payload.refreshToken !== '') {
            state.refreshToken = payload.refreshToken
        }

        if (payload.expiresOn !== null) {
            state.expiresOn = payload.expiresOn
        }
    },

    [mutationTypes.LOG_USER_OUT](state: Token) {
        state.accessToken = ''
        state.refreshToken = '',
        state.expiresOn = new Date()
    }
}

export default {
    namespaced: true,
    state: () => initState,
    getters,
    actions,
    mutations,
}

