import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores/index'
import router from './router'
import 'virtual:svg-icons-register'
import 'vant/lib/index.css'
import './styles/main.scss'

const app = createApp(App)
app.use(router)
app.use(pinia)
import './permission'
app.mount('#app')
