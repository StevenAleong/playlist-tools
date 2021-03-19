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

  import Header from './components/Header.vue'
  import Menu from './components/Menu.vue'
  import Title from './components/Title.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Header,
      Menu,
      Title
    }
  })
</script>
