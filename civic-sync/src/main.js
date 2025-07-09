import './assets/main.css'
import { applyThemeVars } from './theme/theme'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Apply theme CSS variables
applyThemeVars()

// Mount the app
app.mount('#app')

// ✅ After Pinia is installed, THEN call useAuthStore
import { useAuthStore } from './stores/authStore'
useAuthStore(pinia).init()
