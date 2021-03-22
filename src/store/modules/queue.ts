import * as mutationTypes from '../mutation-types'
import * as getterTypes from '../getter-types'
import { Commit } from 'vuex'

export interface Job {
    uniqueId: string,
    source: string,
    name: string,
    playlistId: string,
    jobType: string,
    totalTracks: number,
    progress: number,
    dateAdded: Date,
    cancelProcessing: boolean
}

export interface Queue {
    processing?: Job,
    queued: Job[],
    paused: boolean
}

const initState: Queue = {
    queued: [],
    paused: false
}

const getters = {
    
}

const actions = {

}

const mutations = {
    [mutationTypes.ADD_JOB_TO_QUEUE](state: Queue, payload: Job) {
        state.queued.push(payload)      
    },



}


export default {
    namespaced: true,
    state: () => initState,
    getters,
    actions,
    mutations,
}