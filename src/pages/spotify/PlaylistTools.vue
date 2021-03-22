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
            <tr v-for="pl in playlists" :key="pl">
        
                <td class="border-b p-2 align-top" style="width: 95px;">
                    <a :href="pl.external_urls.spotify" target="_blank">
                        <img :src="pl.images[0].url" class="w-full" />
                    </a>
                </td>

                <td class="border-b p-2 align-top">
                    <div class="font-bold text-2xl">
                        <a :href="pl.external_urls.spotify" target="_blank" class="no-underline text-green-500 hover:text-green-800">{{pl.name}}</a>
                    </div>
                    <div class="text-sm mb-1">
                        <i>Tracks: {{pl.tracks.total}}</i>
                    </div>
                    <div>
                        <button v-on:click="shufflePlaylist(pl)" class="px-1 mr-3 text-sm text-blue-500 border rounded-sm hover:bg-green-500 hover:text-white">
                            <IconBase iconName="random" iconClass="h-3 w-3 fill-current inline-block"><IconRandom /></IconBase>
                            Shuffle
                        </button>

                        <button v-on:click="reversePlaylist(pl)" class="px-1 mr-3 text-sm text-yellow-800 border rounded-sm hover:bg-yellow-800 hover:text-white">
                            <IconBase iconName="reverse" iconClass="h-3 w-3 fill-current inline-block"><IconReverse /></IconBase>
                            Reverse
                        </button>
                    </div>
                </td>

            </tr>
        </tbody>
    </table>

</template>
<script>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { defineComponent } from 'vue'
    import constants from '../../constants'
    import * as mutationTypes from '../../store/mutation-types'
    import * as getterTypes from '../../store/getter-types'
    import { getUserInformation, getUserPlaylists } from '../../api/spotify'
    
    import IconBase from '../../components/IconBase.vue'
    import IconRandom from '../../components/icons/IconRandom.vue'
    import IconReverse from '../../components/icons/IconReverse.vue'

    export default defineComponent({
        name: 'SpotifyPlaylistTools',
        setup() {
            const store = useStore()
            const spotifyToken = computed(() => store.state.spotifyToken)
            const debug = process.env.NODE_ENV !== 'production'

            return {
                spotifyToken,
                debug
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
            shufflePlaylist: function(pl) {
                //this.state.addToQueue(sources.SPOTIFY, pl.id, jobTypes.SHUFFLE, pl.tracks.total, pl.name);      
            },
            reversePlaylist: function(pl) {
                //this.state.addToQueue(sources.SPOTIFY, pl.id, jobTypes.REVERSE, pl.tracks.total, pl.name); 
            },
            toggleSchedule: function(pl) {
                //var plIndex = this.playlists.findIndex(item => item.id === pl.id);
                //this.playlists[plIndex].showSchedule = !this.playlists[plIndex].showSchedule;
            },
            async loadPlaylists() {
                var keepLooping = false
                var i = 1
                var _this = this

                do {
                    var playlists = getUserPlaylists(50, i)
                    playlists.then(function(data) {
                        _this.totalPlaylists = data.body.total;

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

