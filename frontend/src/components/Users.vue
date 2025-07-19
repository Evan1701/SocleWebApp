<template>
  <div class="container">
    <h1>Liste des utilisateurs</h1>
    
    <button @click="loadUsers">Rafraîchir la liste</button>

    <!-- Lien vers la page d'ajout d'utilisateur -->
      <router-link to="/addUsers"><button>Ajouter un utilisateur</button></router-link>

    <!-- Grille pour afficher les utilisateurs sous forme de cartes -->
    <div class="user-grid">
      <div v-for="user in users" 
           :key="user.id" 
           class="user-card-wrapper">
        <div class="user-card">
          <button class="deleteButton" @click.stop="triggerConfirmPopup(user)">
            <img src="../assets/icons/delete.png" alt="Supprimer" />
          </button>
          <router-link :to="'/user/' + user.id">
            <img v-if="user.image" :src="user.image" alt="Avatar utilisateur" class="user-image" />
            <h3 class="user-name">{{ user.name }}</h3>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Pop-ups pour l'erreur et le succès -->
    <ConfirmationPopup ref="confirmationPopupRef" />
    <popUpError ref="popupErrorRef" />
    <popUpSuccess ref="popupSuccessRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { deleteUser as deleteUserApi, searchUsers } from '../api';
import popUpError from '../elements/popUpError.vue';
import popUpSuccess from '../elements/popUpSuccess.vue';
import ConfirmationPopup from '../elements/confirmationPopup.vue';
import { handleError, handleSuccess, fetchUsersList, arrayBufferToBase64 } from '../utils/utils'; 
import { RouterLink } from 'vue-router';

// Références pour la pop-up
const popupErrorRef = ref(null);
const popupSuccessRef = ref(null);
const confirmationPopupRef = ref(null);
const confirmMessage = ref('');
const showConfirmPopup = ref(false);

// Référence pour la liste des utilisateurs
const users = ref([]);

// Charger la liste des utilisateurs
const loadUsers = async () => {
    await fetchUsersList(users, popupErrorRef);
    console.log('Utilisateurs chargés:', users.value);

    users.value.forEach(user => {
        console.log('Utilisateur:', user);  // Afficher toutes les données de l'utilisateur
        if (user.image) {
            if (typeof user.image !== 'string') {
                console.log('Image avant conversion:', user.image); // Afficher les données binaires avant conversion
                user.image = 'data:image/png;base64,' + arrayBufferToBase64(user.image);
                console.log('Image après conversion:', user.image); // Afficher l'image après conversion en base64
            } else {
                console.log('Image déjà au format Base64 ou URL:', user.image);
            }
        }
    });
};

// Fonction pour afficher la pop-up de confirmation
const triggerConfirmPopup = (user) => {
    confirmationPopupRef.value.triggerConfirmPopup(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.name} ?`,
        () => deleteUser(user.id)
    );
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (userId) => {
    try {
        console.log('Suppression de l\'utilisateur avec ID:', userId);
        await deleteUserApi(userId);
        users.value = users.value.filter(user => user.id !== userId);
        handleSuccess(popupSuccessRef, 'Utilisateur supprimé avec succès !');
    } catch (error) {
        handleError(popupErrorRef, `Erreur lors de la suppression de l'utilisateur ${userId}.`, error);
    }
};

// Fonction pour chercher un utilisateur
const searchUser = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
        await loadUsers();
        return;
    }

    try {
        console.log('Recherche d\'utilisateur avec le terme:', searchTerm); // Log du terme de recherche
        users.value = await searchUsers(searchTerm);

        // Assure-toi de convertir les images en base64 comme dans loadUsers
        users.value.forEach(user => {
            console.log('Utilisateur:', user);
            if (user.image) {
                if (typeof user.image !== 'string') {
                    console.log('Image avant conversion:', user.image); // Afficher les données binaires avant conversion
                    user.image = 'data:image/png;base64,' + arrayBufferToBase64(user.image);
                    console.log('Image après conversion:', user.image); // Afficher l'image après conversion en base64
                } else {
                    console.log('Image déjà au format Base64 ou URL:', user.image);
                }
            }
        });
    } catch (error) {
        console.error('Erreur lors de la recherche des utilisateurs:', error); // Log de l'erreur détaillée
        handleError(popupErrorRef, 'Erreur lors de la recherche des utilisateurs.', error);
    }
};

// Fonction pour gérer la recherche d'utilisateur
const searchInput = ref('');
const route = useRoute();

onMounted(() => {
    const initialSearch = route.query.search || '';
    if (initialSearch) {
        searchInput.value = initialSearch;
        searchUser(initialSearch);
    } else {
        loadUsers();
    }
});

const handleSearch = () => {
    searchUser(searchInput.value);
};

// Ajouter un watcher pour détecter les changements de la query dans l'URL
watch(() => route.query.search, (newSearch) => {
    if (newSearch !== undefined) {
        searchInput.value = newSearch;
        searchUser(newSearch);
    } else {
        loadUsers();
    }
});

// Charger les utilisateurs au montage
// onMounted(loadUsers);
</script>

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

/* Wrapper pour la carte utilisateur */
.user-card-wrapper {
  position: relative;
}

/* Carte utilisateur */
.user-card {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
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

.deleteButton {
  background: #e95354;
  border: none;
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}
.user-card:hover .deleteButton {
  opacity: 1;
}
.deleteButton img {
  width: 16px;
  height: 16px;
}

.deleteButton:hover {
  background: #c44242;
}
</style>