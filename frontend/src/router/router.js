import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';  // Importer le composant de la page d'accueil
import Users from '../components/Users.vue';  // Importer le composant de la page Users
import AddUsers from '../components/AddUsers.vue'; // Importer le composant de la page d'ajout d'utilisateurs
import UserDetails from '../components/UserDetails.vue'; // Importer le composant de la page de détails d'un utilisateur

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
  {
    path: '/addUsers',
    name: 'AddUsers',
    component: AddUsers,  // Importer le composant de la page d'ajout d'utilisateurs
  },

  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails,  // Importer le composant de la page de détails d'un utilisateur
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
});

export default router;