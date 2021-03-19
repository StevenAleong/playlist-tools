import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import router from './router'
import store from './store'

import Block from './components/Block.vue'
import ColourBlock from './components/ColourBlock.vue'

// https://github.com/vitejs/vite/tree/main/packages/create-app

const app = createApp(App)

// The goods
app.use(store)
app.use(router)

// Global Components
app.component('Block', Block)
app.component('ColourBlock', ColourBlock)

// The app
app.mount('#app')
