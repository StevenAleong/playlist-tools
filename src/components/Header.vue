<template>
    <header class="fixed z-50 w-full bg-gray-900 shadow">
        <div class="h-14 flex items-center justify-between">
            <div class="flex items-center h-full px-4">
                <router-link to="/" class="w-full text-white uppercase text-2xl no-underline">
                    <span class="w-full text-white uppercase text-2xl">
                        <img src="../assets/icon.png" class="inline-flex max-h-max h-7 mr-3 align-middle" />
                        <span class="font-extrabold">Playlist Tools</span>
                        <span class="text-sm pl-2">by Steven Aleong</span>
                    </span>
                </router-link>
            </div>
            <div class="flex items-center text-right h-full px-4">
                <div class="w-full text-white">
                    <div><b>Queue</b>: {{ queue.queued.length }}</div>
                    <div>
                        <b>Processing</b>:

                        <span v-if="queue.processing != null">
                            <span class="text-green-300 track-name mr-1">{{queue.processing.name}}</span>
                            [<span class="text-white-500">{{ queue.processing.totalTracks }} tracks - {{ queue.progress.toFixed(2) }}%</span>]
                            <button title="Stop the current processing item" v-on:click="stopProcessing"><IconBase iconName="cancel" iconClass="h-4 w-4 fill-current inline-block text-red-500"><IconCancel /></IconBase></button>
                        </span>

                        <span v-if="queue.processing == null">Nothing</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="processing-bar-wrapper">
            <div class="processing-bar processing-background" :style="progressStyle"></div>
        </div>
    </header>
</template>

<script>
    import { defineComponent, computed } from 'vue'
    import { useStore } from 'vuex'
    import * as mutationTypes from '../store/mutation-types'
    import constants from '../constants'

    import IconBase from '../components/IconBase.vue'
    import IconCancel from '../components/icons/IconCancel.vue'

    export default defineComponent({
        name: "Header",
        setup() {
            const store = useStore();

            const queue = computed(() => store.state.queue);
            const debug = process.env.NODE_ENV !== "production";

            return {
                queue,
                debug,
            }
        },
        components: {
            IconBase,
            IconCancel
        },
        computed: {
            progressStyle () {
                return 'width: ' + (this.queue.processing !== undefined && this.queue.processing !== null ? this.queue.progress : 0) + '%'
            }
        },
        methods: {
            stopProcessing() {
                this.$store.commit(constants.storeQueue + '/' + mutationTypes.SET_AS_CANCEL)
            }
        }
    })
</script>

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
