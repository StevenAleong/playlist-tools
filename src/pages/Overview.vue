<template>

    <Block v-if="spotifyToken.length === 0" class="mb-4 bg-green-400 text-white font-bold">
        You are not logged into Spotify. To use this app, you need to authenticate/login through Spotify.<br />
        <router-link to="/spotify-setup" class="text-green-800 hover:text-green-700">Log in using your Spotify account</router-link>
    </Block>

    <div class="grid gap-4 grid-cols-12 md:grid-cols-6 lg:grid-cols-4">
        <div class="flex">
            <Block class="mb-4 bg-green-400 text-white">
                # of Spotify Playlists Shuffled
                <div class="text-4xl font-bold">
                    132,493
                </div>
            </Block>
        </div>

        <div class="flex">
            <Block class="mb-4 bg-green-400 text-white">
                # of Spotify Playlists Reversed
                <div class="text-4xl font-bold">
                    20,403
                </div>
            </Block>
        </div>
    </div>

    <div v-if="queue.queued.length > 0">
        <h2 class="mb-3">Job Queue</h2>

        <table  class="table-auto border-collapse border w-full">
            <thead>
                <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">Playlist Name</th>
                    <th class="px-5 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">Source</th>
                    <th class="px-5 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">Job</th>
                    <th class="px-5 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 text-right"># Tracks</th>
                    <th class="px-5 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pl in queue.queued" :key="pl">
                    <td class="px-5 py-2 whitespace-no-wrap border-b border-gray-500">{{pl.name}}</td>
                    <td class="px-5 py-2 whitespace-no-wrap border-b border-gray-500">{{pl.source}}</td>
                    <td class="px-5 py-2 whitespace-no-wrap border-b border-gray-500">{{pl.jobType}}</td>
                    <td class="px-5 py-2 whitespace-no-wrap border-b border-gray-500 text-right">{{pl.totalTracks}}</td>
                    <td class="px-5 py-2 whitespace-no-wrap border-b border-gray-500 text-right">
                        <button title="Remove this job from queue" v-on:click="removeFromQueue(pl.uniqueId)">
                            <IconBase iconName="cancel" iconClass="h-4 w-4 fill-current inline-block text-red-500"><IconCancel /></IconBase>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    

    <!-- 
    <Block v-if="this.state.data.deezerToken == null && this.state.data.showDeezer" class="mb-4 bg-red-400 text-white font-bold">
        You are not logged into Deezer.
        <router-link to="/deezer-setup" class="text-red-800 hover:text-red-700">Setup your Deezer account</router-link>
    </Block>

    <div class="rounded overflow-hidden border shadow-md bg-yellow-400 text-white font-bold mb-4" v-if="this.state.data.processing == null">
        <div class="px-5 py-4">
            Nothing is currently processing.
        </div>
    </div>
    
    <ColourBlock v-if="this.state.data.processing != null" class="mb-4">
        <LoadingIcon />
        [{{displaySourceType}}] {{displayJobType}} {{state.data.processing.name}} with {{state.data.processing.totalTracks}} tracks
    </ColourBlock>

     -->
</template>

<script>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { defineComponent } from 'vue'
    import * as mutationTypes from '../store/mutation-types'
    import constants from '../constants'

    import IconBase from '../components/IconBase.vue'
    import IconCancel from '../components/icons/IconCancel.vue'

    export default defineComponent({
        name: 'Dashboard',
        setup() {
            const store = useStore()

            const queue = computed(() => store.state.queue)
            const spotifyToken = computed(() => store.state.spotifyToken.accessToken)

            return {
                spotifyToken,
                queue
            }
        },
        components: {
            IconBase,
            IconCancel
        },
        computed: {
            
        },
        methods: {
            removeFromQueue(uniqueId) {
                this.$store.commit(constants.storeQueue + '/' + mutationTypes.REMOVE_JOB_FROM_QUEUE, uniqueId)
            }
        }
    })
</script>

<style>

</style>