<template>
    <header class="fixed z-50 w-full bg-gray-900 shadow">
        <div class="h-14 flex items-center justify-between">

            <div class="flex items-center h-full px-4">
                <router-link to="/" class="w-full text-white uppercase text-2xl no-underline">
                    <span class="w-full text-white uppercase text-2xl">
                        <img src="../assets/icon.png" class="inline-flex max-h-max h-7 mr-3 align-middle" />
                        <span class="font-extrabold">Playlist Tools</span> <span class="text-sm">by Steven Aleong</span>
                    </span>
                </router-link>
            </div>
            <div class="flex items-center text-right h-full px-4">
                <div class="w-full text-white">
                    <div>
                        <b>Queue</b>: 0
                    </div>
                    <div>
                        <b>Processing</b>: <span>Nothing</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="processing-bar-wrapper">
            <div class="processing-bar processing-background"></div>
        </div>
    </header>
</template>

<style>
    .track-name {
        max-width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .processing-bar-wrapper {
        height: 5px;
    }
    .processing-bar {
        height: 5px;     
    }
    .processing-background {
        background: linear-gradient(-45deg, #24e33b, #2249e3, #c96e12, #d60b0b);
        background-size: 400% 400%;
        animation: gradient 20s ease;
        animation-iteration-count: infinite;
    }
</style>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'Header'
    })

</script>
