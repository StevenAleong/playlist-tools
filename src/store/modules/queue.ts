import * as mutationTypes from '../mutation-types'
import * as getterTypes from '../getter-types'
import { Queue, Job } from '../../models'
import { Commit } from 'vuex'

const initState: Queue = {
    isProcessing: false,
    queued: [],
    paused: false,
    cancel: false,
    progress: 0.00
}

const getters = {
    [getterTypes.GET_IS_CANCELLED](state: Queue) {
        return state.cancel
    },

    [getterTypes.GET_PROCESSING](state: Queue) {
        return state.processing
    }
}

const actions = {

}

const mutations = {
    [mutationTypes.ADD_JOB_TO_QUEUE](state: Queue, payload: Job) {
        state.queued.push(payload)      
    },

    [mutationTypes.REMOVE_JOB_FROM_QUEUE](state: Queue, payload: string) {
        state.queued.splice(state.queued.findIndex(item => item.uniqueId === payload), 1)
    },

    [mutationTypes.TOGGLE_QUEUE](state: Queue) {
        state.paused = !state.paused
    },

    [mutationTypes.PROCESS_FIRST_IN_QUEUE](state: Queue) {
        state.processing = state.queued.shift()
        state.progress = 0.00
    },

    [mutationTypes.FINISH_PROCESSING](state: Queue) {
        state.processing = undefined
        state.isProcessing = false
    },

    [mutationTypes.UPDATE_PROCESS_TRACK_COUNT](state: Queue, payload: number) {
        if (state.processing !== undefined && state.processing !== null) {
            state.processing.totalTracks = payload
        }        
    },

    [mutationTypes.SET_AS_PROCESSING](state: Queue) {
        state.isProcessing = true
    },

    [mutationTypes.SET_AS_CANCEL](state: Queue) {
        state.cancel = true
    },

    [mutationTypes.REMOVE_CURRENT_PROCESSING](state: Queue) {
        state.processing = undefined
        state.isProcessing = false
        state.cancel = false        
    },

    [mutationTypes.UPDATE_PROGRESS](state: Queue, payload: number) {
        state.progress = payload
    }

}


export default {
    namespaced: true,
    state: () => initState,
    getters,
    actions,
    mutations,
}