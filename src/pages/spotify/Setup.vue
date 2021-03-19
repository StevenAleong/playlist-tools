<template>
    <Block v-if="spotifyToken.length === 0" class="mb-5">
        To get this tool working, you'll need to first log in and authorize this app. 
        Once authenticated, the menu will change to show you the rest of the options.
    </Block>
</template>

<script>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { defineComponent } from 'vue'
        

    export default defineComponent({
        name: 'SpotifySetup',
        setup() {
            const store = useStore()

            const spotifyToken = computed(() => store.state.spotity_Token.access_token)

            return {
                spotifyToken
            }
        },
        methods: {

        }
    })
</script>

