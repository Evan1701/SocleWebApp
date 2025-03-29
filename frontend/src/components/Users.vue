<script setup>
import { ref, onMounted } from 'vue';
import { fetchUsers, addUser as addUserApi, deleteUser as deleteUserApi } from '../api'; // Importation des fonctions API
import popUpError from '../elements/popUpError.vue'; // Importation de la pop-up d'erreur
import popUpSuccess from '../elements/popUpSuccess.vue'; // Importation de la pop-up de succès

// Références pour la pop-up
const popupErrorRef = ref(null);
const popupSuccessRef = ref(null);

// Référence pour la liste des utilisateurs
const users = ref([]);
const name = ref('');
const email = ref('');

// Fonction pour récupérer la liste des utilisateurs
const fetchUsersList = async () => {
    try {
        users.value = await fetchUsers(); // Appel à la fonction dans api.js
    } catch (error) {
        // Gestion des erreurs si nécessaire
        popupErrorRef.value.triggerErrorPopup('Erreur lors de la récupération des utilisateurs.'); // Appel de la pop-up d'erreur
        console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
};

// Fonction pour ajouter un utilisateur
const addUser = async () => {
    if (!name.value || !email.value) return; // Vérification que les champs ne sont pas vides

    try {
        await addUserApi(name.value, email.value); // Appel à la fonction dans api.js
        name.value = '';
        email.value = '';
        // Rafraîchir la liste des utilisateurs après l'ajout
        await fetchUsersList(); // Rafraîchir la liste des utilisateurs après l'ajout
        // Appel de la pop-up de succès
        popupSuccessRef.value.triggerSuccessPopup('Utilisateur ajouté avec succès !'); // Appel de la pop-up de succès

    } catch (error) {
        // Gestion des erreurs si nécessaire
        popupErrorRef.value.triggerErrorPopup('Erreur lors de l\'ajout de l\'utilisateur.'); // Appel de la pop-up d'erreur
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
};

// Fonction pour supprimer un utilisateur (renommée pour éviter le conflit)
const deleteUser = async (userId) => {
    try {
      console.log('Suppression de l\'utilisateur avec ID:', userId); // Log pour le débogage
        // Appel à la fonction de suppression dans api.js
        await deleteUserApi(userId); // Appel à la fonction dans api.js
        // Rafraîchir la liste des utilisateurs après la suppression
        await fetchUsersList(); // Rafraîchir la liste des utilisateurs après la suppression
        // Appel de la pop-up de succès
        popupSuccessRef.value.triggerSuccessPopup('Utilisateur supprimé avec succès !'); // Appel de la pop-up de succès

    } catch (error) {
        // Gestion des erreurs si nécessaire
        popupErrorRef.value.triggerErrorPopup('Erreur lors de la suppression de l\'utilisateur.'); // Appel de la pop-up d'erreur
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
};

// Appel de la fonction fetchUsersList() au montage du composant
onMounted(fetchUsersList);
</script>

<template>
  <div class="container">
    <h1>Liste des utilisateurs</h1>

    <h2>Ajouter un utilisateur</h2>
    
    <!-- Formulaire d'ajout d'un utilisateur -->
    <div class="form-group">
      <input v-model="name" placeholder="Nom" />
      <input v-model="email" placeholder="Email" />
      <button @click="addUser">Ajouter</button>
    </div>
    
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
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

/* Style du formulaire d'ajout */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
}

/* Style des champs de saisie */
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

/* Style du bouton d'ajout */
button {
  background: #57bd84;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

/* Effet au survol du bouton */
button:hover {
  background: #4aa371;
}
</style>