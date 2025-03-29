import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'; // Importer le router

createApp(App)
    .use(router) // Utiliser le router
    .mount('#app')
