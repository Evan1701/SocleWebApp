import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';  // Importer le composant de la page d'accueil
import Users from '../components/Users.vue';  // Importer le composant de la page Users
import AddUsers from '../components/AddUsers.vue'; // Importer le composant de la page d'ajout d'utilisateurs
import UserDetails from '../components/UserDetails.vue'; // Importer le composant de la page de détails d'un utilisateur
import Connexion from '../components/Connexion.vue';
import Inscription from '../components/Inscription.vue';

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
    props: route => ({ searchQuery: route.query.name }),  // Passer la requête de recherche en tant que prop
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
  },

  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion,  // Importer le composant de la page de connexion
  },

  {
    path:'/inscription',
    name:'Inscription',
    component: Inscription,  // Importer le composant de la page d'inscription
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
});

export default router;