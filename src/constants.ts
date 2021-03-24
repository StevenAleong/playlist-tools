let stevenAleongRootUrl:string = process.env.NODE_ENV !== 'production' ? 'http://localhost:16122' : 'https://stevenaleong.com'
let storeSpotifyToken:string = 'spotifyToken'
let storeQueue:string = 'queue'

export default {
    stevenAleongRootUrl: stevenAleongRootUrl,
    spotifyLoginUrl: stevenAleongRootUrl + '/apps/spotifyplaylisttools/authorization',
    spotifyRefreshUrl: stevenAleongRootUrl + '/apps/spotifyplaylisttools/refresh',
    storeSpotifyToken: storeSpotifyToken,
    storeQueue: storeQueue
}

export const Sources = {
    SPOTIFY: 'spotify',
    DEEZER: 'deezer',
    APPLEMUSIC: 'applemusic'
}

export const JobTypes = {
    SHUFFLE: 'shuffle',
    REVERSE: 'reverse'
}