import './assets/main.css'
import { applyThemeVars } from './theme/theme'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useAuthStore } from './stores/authStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

//apply themes
applyThemeVars()

app.mount('#app')

// initalizing firebase auth listerner
useAuthStore().init()
