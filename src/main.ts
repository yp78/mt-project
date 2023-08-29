import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import 'virtual:svg-icons-register'
import 'vant/lib/index.css'
import './styles/main.scss'

const app = createApp(App)
app.use(pinia)
app.use(router)
// import './mini'
app.mount('#app')
