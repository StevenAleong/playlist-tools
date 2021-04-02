<template>
    <div id="main-menu" class="fixed z-40 inset-y-0 left-0 bg-gray-800">
        <div style="padding-top: 60px;">
            <div class="py-2">
                <div class="group relative sidebar-item with-children">
                    <router-link to="/" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="musicnotelist" iconClass="h-5 w-5 fill-current mr-1"><IconMusicNoteList /></IconBase>
                        Overview
                    </router-link>
                </div>

                <div class="group relative sidebar-item with-children">
                    <router-link to="/about" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="info" iconClass="h-5 w-5 fill-current mr-1"><IconInfo /></IconBase>
                        About/Support
                    </router-link>
                </div>

            </div>

            <div class="py-2 text-white">

                <div class="block uppercase font-bold text-green-400 px-4 py-2 text-left">
                    Spotify
                </div>
                                
                <div v-if="spotifyToken.length > 0" class="group relative sidebar-item with-children">
                    <router-link to="/spotify-playlist-tools" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="random" iconClass="h-5 w-5 fill-current text-green-400 mr-1"><IconRandom /></IconBase>
                        Playlist Tools
                    </router-link>
                </div>

                    
                <div v-if="spotifyToken.length > 0" class="group relative sidebar-item with-children">
                    <router-link to="/spotify-playlist-tools" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="alarm" iconClass="h-5 w-5 fill-current text-green-400 mr-1"><IconAlarm /></IconBase>
                        BPM Playlist 
                    </router-link>
                </div>

                <div v-if="spotifyToken.length > 0" class="group relative sidebar-item with-children">
                    <router-link to="/spotify-funneler" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="funnel" iconClass="h-5 w-5 fill-current text-green-400 mr-1"><IconFunnel /></IconBase>
                        Funneler
                    </router-link>
                </div>


                <!-- 

                <div v-if="spotifyToken.length > 0" class="group relative sidebar-item with-children">
                    <router-link to="/spotify-internet-radio" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="radio" iconClass="h-5 w-5 fill-current text-green-400 mr-1"><IconRadio /></IconBase>
                        Internet Radio
                    </router-link>
                </div> -->
                                
                <div class="group relative sidebar-item with-children">
                    <router-link to="/spotify-setup" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="panel" iconClass="h-5 w-5 fill-current text-green-400 mr-1"><IconPanel /></IconBase>
                        Setup
                    </router-link>
                </div>

            </div>
  
            <div class="py-2 text-white">
                <div class="block uppercase font-bold text-red-600 px-4 py-2 text-left">
                    Deezer
                </div>

                <div class="group relative sidebar-item with-children">
                    <div class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4">
                        Coming Eventually
                    </div>
                    
                </div>
      
                <!-- <div class="group relative sidebar-item with-children">
                    <router-link to="/deezer-playlist-tools" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="random" iconClass="h-5 w-5 fill-current text-red-400 mr-1"><IconRandom /></IconBase>
                        Playlist Tools
                    </router-link>
                </div>

                <div class="group relative sidebar-item with-children">
                    <router-link to="/deezer-setup" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="panel" iconClass="h-5 w-5 fill-current text-red-400 mr-1"><IconPanel /></IconBase>
                        Setup
                    </router-link>
                </div> -->

            </div>

            <div class="py-2 text-white">
                <div class="block uppercase font-bold text-red-400 px-4 py-2 text-left">
                    Apple Music
                </div>

                <div class="group relative sidebar-item with-children">
                    <div class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4">
                        Coming Maybe
                    </div>
                    
                </div>
      
                <!-- <div class="group relative sidebar-item with-children">
                    <router-link to="/deezer-playlist-tools" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="random" iconClass="h-5 w-5 fill-current text-red-400 mr-1"><IconRandom /></IconBase>
                        Playlist Tools
                    </router-link>
                </div>

                <div class="group relative sidebar-item with-children">
                    <router-link to="/deezer-setup" class="block flex items-center text-white text-center text-left shadow-light shadow-none no-underline py-2 px-4 hover:bg-black hover:text-white">
                        <IconBase iconName="panel" iconClass="h-5 w-5 fill-current text-red-400 mr-1"><IconPanel /></IconBase>
                        Setup
                    </router-link>
                </div> -->

            </div>

        </div>        
    </div>
</template>

<script>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    
    import IconBase from './IconBase.vue'
    import IconMusicNoteList from './icons/IconMusicNoteList.vue'
    import IconRandom from './icons/IconRandom.vue'
    import IconFunnel from './icons/IconFunnel.vue'
    import IconRadio from './icons/IconRadio.vue'
    import IconGear from './icons/IconGear.vue'
    import IconPanel from './icons/IconPanel.vue'
    import IconInfo from './icons/IconInfo.vue'
    import IconAlarm from './icons/IconAlarm.vue'

    export default {
        setup() {
            const store = useStore()

            const spotifyToken = computed(() => store.state.spotifyToken.accessToken)

            return {
                spotifyToken
            }
        },
        name: 'Menu',
        props: {

        },
        mounted() {
        },
        components: {
            IconBase,
            IconMusicNoteList,
            IconRandom,
            IconFunnel,
            IconRadio,
            IconGear,
            IconAlarm,
            IconPanel,
            IconInfo
        }
    }
</script>

<style scoped>
    #main-menu {
        min-width: 250px;
        overflow-y: auto;
    }
</style>