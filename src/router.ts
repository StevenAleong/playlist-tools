import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Overview from './pages/Overview.vue'
import About from './pages/About.vue'

import SpotifySetup from './pages/spotify/Setup.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Overview', component: Overview }
    ,{ path: '/about', name: 'About', component: About, meta: { title: 'About', requiresAuth: false } }
    // ,{ path: '/logs', name: 'Logs', component: Logs, meta: { title: 'Logs' } }
    // ,{ path: '/scheduled', name: 'Scheduled', component: Scheduled, meta: { title: 'Scheduled' } }
    // ,{ path: '/settings', name: 'Settings', component: Settings, meta: { title: 'Settings' } }

    // ,{ path: '/spotify-playlist-tools', name: 'SpotifyPlaylistTools', component: SpotifyPlaylistTools, meta: { title: 'Playlist Tools - Spotify' } }
    // ,{ path: '/spotify-funneler', name: 'SpotifyFunneler', component: SpotifyFunneler, meta: { title: 'Funneler - Spotify' } }
    // ,{ path: '/spotify-internet-radio', name: 'SpotifyInternetRadio', component: SpotifyInternetRadio, meta: { title: 'Internet Radio - Spotify' } }
    // ,{ path: '/spotify-settings', name: 'spotifySettings', component: spotifySettings, meta: { title: 'Settings - Spotify' } }
    ,{ path: '/spotify-setup', name: 'SpotifySetup', component: SpotifySetup, meta: { title: 'Setup - Spotify', requiresAuth: false } }
    
    // ,{ path: '/deezer-playlist-tools', name: 'DeezerPlaylistTools', component: DeezerPlaylistTools, meta: { title: 'Playlist Tools - Deezer' } }
    // ,{ path: '/deezer-settings', name: 'deezerToken', component: deezerToken, meta: { title: 'Settings - Deezer' } }
    // ,{ path: '/deezer-setup', name: 'DeezerSetup', component: DeezerSetup, meta: { title: 'Setup - Deezer' } }
];

const router = createRouter({
    history: createWebHistory(),
    routes    
});

router.beforeEach((toRoute) => {
    document.title = toRoute.meta.title || 'Playlist Tools by Steven Aleong'
});

export default router