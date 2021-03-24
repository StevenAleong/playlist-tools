<template>
    <Header />
    <Menu />

    <div id="main" class="h-full">
        <div id="content-wrapper" class="text-left" style="padding-top: 60px;">
            <Title DisplayText="About Playlist Tools" />
            <div class="p-4">
                <router-view></router-view>    
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import constants, { Sources } from './constants'
    import * as mutationTypes from './store/mutation-types'
    import { processPlaylist } from './api/spotify'

    import Header from './components/Header.vue'
    import Menu from './components/Menu.vue'
    import Title from './components/Title.vue'

    export default defineComponent({
        name: 'App',
        components: {
            Header,
            Menu,
            Title
        },
        data () {
            return {
                polling: 0,
                processing: 0
            }
        },
        setup() {
            const store = useStore()

            const queue = computed(() => store.state.queue)
            const spotifyToken = computed(() => store.state.spotifyToken.accessToken)

            return {
                spotifyToken,
                queue
            }
        },
        methods: {
            checkQueue() {
                this.polling = window.setInterval(() => {
                    if (this.queue.processing === undefined || this.queue.processing === null) {
                        if (this.queue.queued.length > 0) {
                            this.$store.commit(constants.storeQueue + '/' + mutationTypes.PROCESS_FIRST_IN_QUEUE)
                        }
                    }                    
                }, 5000)

            },

            processThePlaylist() {
                this.processing = window.setInterval(() => {
                    if (this.queue.processing !== undefined && this.queue.processing !== null && this.queue.isProcessing === false) {
                        if (this.queue.processing.source === Sources.SPOTIFY) {
                            processPlaylist(this.queue.processing)
                        }
                        
                    }                    
                }, 5000)

            }
        },
        beforeUnmount () {
            clearInterval(this.polling)
            clearInterval(this.processing)
        },
        created () {
            this.checkQueue()
            this.processThePlaylist()
        }
    })
</script>
