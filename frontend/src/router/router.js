import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';  // Importer le composant de la page d'accueil
import Users from '../components/Users.vue';  // Importer le composant de la page Users

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,  // Associer le chemin "/" à ton composant Home
  },
  // Ajoute ici d'autres pages si nécessaire
  {
    path: '/users',
    name: 'Users',
    component: Users,  
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
});

export default router;