import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import '@/assets/main.css'

createApp(App).use(plugin, defaultConfig).mount('#app')
