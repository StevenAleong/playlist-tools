<template>
    <Block v-if="!this.isLoading && this.playlists.length == 0" class="mb-5 bg-green-400 text-white font-bold">
        No playlists found
    </Block>

    <ColourBlock v-if="this.isLoading">
        Loading Playlists...
    </ColourBlock>

    <ColourBlock v-if="!this.isLoading && this.playlists.length > 0" class="mb-5">
        <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded float-right text-xs -m-1" @click="reloadPlaylists">
            Reload Playlists 
        </button>

        Playlists for {{username}}
    </ColourBlock>

    <table v-if="!this.isLoading && this.playlists.length > 0" class="table-auto border-collapse border w-full">
        <tbody>
            <tr v-for="pl in playlists" :key="pl" class="hover:bg-gray-100">
        
                <td class="border-b p-2 align-top" style="width: 120px;">
                    <a :href="pl.external_urls.spotify" target="_blank">
                        <img :src="pl.images[0].url" class="w-full" />
                    </a>
                </td>

                <td class="border-b p-2 align-top">
                    <div class="mb-3">
                        <a :href="pl.external_urls.spotify" target="_blank" class="no-underline text-green-500 hover:text-green-800 font-bold text-xl">{{pl.name}}</a><br />
                        <em class="text-sm">Tracks: {{pl.tracks.total}}</em>                        
                    </div>
                    <div>
                        <button v-on:click="addToQueue(pl, JobTypes.SHUFFLE)" class="px-2 py-1 mr-3 bg-blue-700 text-white border rounded hover:bg-blue-500 hover:text-white">
                            <IconBase iconName="random" iconClass="h-4 w-4 fill-current inline-block"><IconRandom /></IconBase>
                            Shuffle
                        </button>

                        <button v-on:click="addToQueue(pl, JobTypes.REVERSE)" class="px-2 py-1 mr-3 bg-yellow-600 text-white border rounded hover:bg-yellow-800 hover:text-white">
                            <IconBase iconName="reverse" iconClass="h-4 w-4 fill-current inline-block"><IconReverse /></IconBase>
                            Reverse
                        </button>
                    </div>
                </td>

            </tr>
        </tbody>
    </table>

</template>
<script>
    import { useStore } from 'vuex'
    import { defineComponent, computed } from 'vue'
    import { v4 as uuidv4 } from 'uuid'
    import constants, { Sources, JobTypes } from '../../constants'
    import * as mutationTypes from '../../store/mutation-types'
    import * as getterTypes from '../../store/getter-types'
    import { getUserInformation, getUserPlaylists } from '../../api/spotify'
    import moment from 'moment'
    
    import IconBase from '../../components/IconBase.vue'
    import IconRandom from '../../components/icons/IconRandom.vue'
    import IconReverse from '../../components/icons/IconReverse.vue'

    export default defineComponent({
        name: 'SpotifyPlaylistTools',
        setup() {
            const store = useStore()

            const queue = computed(() => store.state.queue)
            const spotifyToken = computed(() => store.state.spotifyToken)
            const debug = process.env.NODE_ENV !== 'production'

            return {
                spotifyToken,
                queue,
                debug,
                JobTypes
            }
        },
        data() {
            return {
                isLoading: true,
                username: '',
                playlists: [],
                totalPlaylists: 0
            }
        },
        beforeMount() {
            this.loadUserInformation()
        },
        components: {
            IconBase,
            IconRandom,
            IconReverse
        },
        computed: {
        },
        methods: {
            reloadPlaylists() {
                this.playlists = []
                this.isLoading = true
                this.loadPlaylists()
            },

            loadUserInformation() {
                var _this = this
                var userInfo = getUserInformation()

                userInfo.then((data) => {
                    _this.username = data.body.display_name
                    _this.loadPlaylists()
                })
            },

            addToQueue: function(pl, jobType) {

                var job = {
                    uniqueId: uuidv4(),
                    source: Sources.SPOTIFY,
                    name: pl.name,
                    playlistId: pl.id,
                    jobType: jobType,
                    totalTracks: pl.tracks.total,
                    dateAdded: moment(),
                    cancelProcess: false
                }

                this.$store.commit(constants.storeQueue + '/' + mutationTypes.ADD_JOB_TO_QUEUE, job)
            },

            async loadPlaylists() {
                var keepLooping = false
                var i = 1
                var _this = this

                do {
                    var playlists = getUserPlaylists(50, i)
                    playlists.then(function(data) {
                        _this.totalPlaylists = data.body.total

                        data.body.items.forEach(function(pl) {
                            if (pl.owner.id === _this.username) {
                                _this.playlists.push(pl)
                            }
                        })

                        keepLooping = data.body.next != null

                        if (!keepLooping) {
                            _this.isLoading = false
                        }
                    })
                    
                    i++

                } while(keepLooping)
            }

        }
    })
</script>

