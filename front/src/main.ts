import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './services/api'

import './assets/main.css'

const app = createApp(App)

app.provide('api', api)

app.use(router) 
app.mount('#app') 

const savedToken = localStorage.getItem('userToken');

if (savedToken) {
  // Si un token existe, on le remet directement dans Axios
  api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
}