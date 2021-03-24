import Vue from 'vue'
import { createStore, createLogger } from 'vuex'

import spotifyUserProfile from './modules/spotify/userProfile'
import spotifyToken from './modules/spotify/token'
import queue from './modules/queue'
import createPersistedState from "vuex-persistedstate";

const debug = process.env.NODE_ENV !== 'production'

const plugins = debug ? [createLogger({})] : []
plugins.push(createPersistedState())

export default createStore({
    modules: {
        queue,
        spotifyUserProfile,
        spotifyToken
    },
    strict: debug,
    plugins: plugins
})

// import { createStore, createLogger } from 'vuex';
// import createPersistedState from 'vuex-persistedstate'


// // TODO: How to surpass cyclical dependency linting errors cleanly?
// // eslint-disable-next-line import/no-cycle
// //import { store as profile, DocumentsStore, State as DocumentsState } from '@/store/modules/profile'

// // // eslint-disable-next-line import/no-cycle
// import { store as profile, ProfileStore, State as ProfileState } from '@/store/modules/profile'

// export type RootState = {
//   //documents: DocumentsState
//   profile: ProfileState
// }

// export type Store = ProfileStore<Pick<RootState, 'profile'>> //& DocumentsStore<Pick<RootState, 'documents'>>

// // Plug in logger when in development environment
// const debug = process.env.NODE_ENV !== 'production'
// const plugins = debug ? [createLogger({})] : []

// // Plug in session storage based persistence
// plugins.push(createPersistedState({ storage: window.sessionStorage }))

// export const store = createStore({
//     plugins,
//     modules: {
//       //documents,
//       //profile,
//     }
// })
  
// export function useStore(): Store {
//     return store as Store
// }