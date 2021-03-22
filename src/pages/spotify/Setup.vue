<template>
    <Block v-if="spotifyToken.accessToken.length === 0" class="mb-5">
        <h2>Login and Authorize this app</h2>
        <p>
            To get this tool working, you'll need to first log in and authorize this app through Spotify.<br />
            Once authenticated, the menu will change to show you the rest of the options.
        </p>
        <p>
            Note: If you're already logged into Spotify through this browser, you'll see a window pop up and close right away.
        </p>
        <div class="mt-5">

        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5" @click="loginSpotify">
            Log Into Spotify
        </button>

        </div>
    </Block>

    <Block v-if="spotifyToken.accessToken.length > 0" class="mb-5">
        <ColourBlock class="mb-5">
            You are logged into Spotify, lets Party!
        </ColourBlock>

        <div v-if="debug">
            <div class="mb-2">
                <b>Access Token</b><br />
                {{spotifyToken.accessToken}}
            </div>
            <div class="mb-2">
                <b>Refresh Token</b><br />
                {{spotifyToken.refreshToken}}
            </div>
            <div>
                <b>Expires on</b><br />
                {{spotifyToken.expiresOn}}
            </div>
            
            <div>
                <b>In about</b><br />
                {{tokenTimeRemaining}}m
            </div>
        </div>
        
        <div class="mt-5">
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-5" @click="logoutSpotify">Clear Spotify</button>        
            <button class="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-5" @click="refreshToken">Refresh Spotify Token</button>     
            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" @click="logToken" v-if="debug">Console Log Spotify Token</button>
        </div>
        
    </Block>
</template>

<script>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { defineComponent } from 'vue'
    import constants from '../../constants'
    import * as mutationTypes from '../../store/mutation-types'
    import * as getterTypes from '../../store/getter-types'
    import { refreshSpotifyLogin } from '../../api/spotify'
    import moment from 'moment'

    export default defineComponent({
        name: 'SpotifySetup',
        setup() {
            const store = useStore()

            const spotifyToken = computed(() => store.state.spotifyToken)
            
            const debug = process.env.NODE_ENV !== 'production'

            return {
                spotifyToken,
                debug
            }
        },
        computed: {
            tokenTimeRemaining () {
                return this.$store.getters[constants.storeSpotifyToken + '/' + getterTypes.GET_TOKEN_MINUTES_REMAINING]

            }
        },
        mounted () {
            window.addEventListener('message', this.receiveMessage)
        },
        beforeUnmount () {
            window.removeEventListener('message', this.receiveMessage)
        },
        methods: {
            // Receive the token info from our server
            receiveMessage(e) {
                // Only accept it if its from our server otherwise, don't!
                if (e.origin !== constants.stevenAleongRootUrl)
                    return

                // Create our access token
                var tokenInfo = {
                    accessToken: e.data.access,
                    refreshToken: e.data.refresh,
                    expiresOn: moment(e.data.expires, "YYYY-MM-DD HH:mm:ss Z")
                }

                // Set it in state
                this.$store.commit(constants.storeSpotifyToken + '/' + mutationTypes.SET_USER_TOKEN, tokenInfo)
            },

            refreshToken() {
                refreshSpotifyLogin()
            },

            loginSpotify() {
                window.open(constants.spotifyLoginUrl, 'spotifyLoginPopup', "height=900,width=500,menubar=no,toolbar=no,location=no")
            },

            logoutSpotify() {
                this.$store.commit(constants.storeSpotifyToken + '/' + types.LOG_USER_OUT)
            },

            logToken() {
                console.log(this.spotifyToken)
            }
        }
    })
</script>

