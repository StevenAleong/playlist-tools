let stevenAleongRootUrl:string = process.env.NODE_ENV !== 'production' ? 'http://localhost:16122' : 'https://stevenaleong.com'
let storeSpotifyToken:string = 'spotifyToken'

export default {
    stevenAleongRootUrl: stevenAleongRootUrl,
    spotifyLoginUrl: stevenAleongRootUrl + '/apps/spotifyplaylisttools/authorization',
    spotifyRefreshUrl: stevenAleongRootUrl + '/apps/spotifyplaylisttools/refresh',
    storeSpotifyToken: storeSpotifyToken
}