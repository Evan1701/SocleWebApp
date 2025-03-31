<script setup>
import { ref, onMounted } from 'vue';
import { deleteUser as deleteUserApi } from '../api';
import popUpError from '../elements/popUpError.vue';
import popUpSuccess from '../elements/popUpSuccess.vue';
import { handleError, handleSuccess, fetchUsersList } from '../utils/utils'; 
import { RouterLink } from 'vue-router';

// Références pour la pop-up
const popupErrorRef = ref(null);
const popupSuccessRef = ref(null);

// Référence pour la liste des utilisateurs
const users = ref([]);

// Charger la liste des utilisateurs
const loadUsers = () => fetchUsersList(users, popupErrorRef);

// Fonction pour supprimer un utilisateur
const deleteUser = async (userId) => {
    try {
        console.log('Suppression de l\'utilisateur avec ID:', userId);
        await deleteUserApi(userId);
        await loadUsers(); // Rafraîchir la liste après suppression
        handleSuccess(popupSuccessRef, 'Utilisateur supprimé avec succès !');
    } catch (error) {
        handleError(popupErrorRef, 'Erreur lors de la suppression de l\'utilisateur.', error);
    }
};

// Charger les utilisateurs au montage
onMounted(loadUsers);
</script>

<template>
  <div class="container">
    <h1>Liste des utilisateurs</h1>
    
    <button @click="loadUsers">Rafraîchir la liste</button>
    <button>
      <router-link to="/addUsers">Ajouter un utilisateur</router-link>
    </button>

    <!-- Grille pour afficher les utilisateurs sous forme de cartes -->
    <div class="user-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <button @click="deleteUser(user.id)">Supprimer</button>
        <img src="../assets/personne.jpg" alt="Avatar utilisateur" class="user-image" />
        <h3 class="user-name">{{ user.name }}</h3>
      </div>
    </div>

    <!-- Pop-ups pour l'erreur et le succès -->
    <popUpError ref="popupErrorRef" />
    <popUpSuccess ref="popupSuccessRef" />
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  max-width: 800px;
  margin: auto;
}

/* Mise en page de la grille des utilisateurs */
.user-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr)); /* Toujours 3 colonnes */
  gap: 20px;
  margin-top: 20px;
  min-height: 200px; /* Hauteur minimale pour éviter les sauts */
  align-items: start; /* Évite que les éléments s’étendent de manière inégale */
}

/* Carte utilisateur */
.user-card {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Image de l'utilisateur */
.user-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

/* Nom de l'utilisateur */
.user-name {
  margin-top: 10px;
  font-size: 1.2rem;
  color: #333;
}

/* Style du bouton d'ajout */
button {
  background: #57bd84;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin: 1em;
}

button a {
  color: white;
  text-decoration: none;
}

/* Effet au survol du bouton */
button:hover {
  background: #4aa371;
}
</style>