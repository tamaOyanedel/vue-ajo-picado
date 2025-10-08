import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import store from './store'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.provide('store', store)
app.mount('#app')
