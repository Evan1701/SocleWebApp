<script setup>
import { ref } from 'vue';
import { addUser as addUserApi } from '../api'; 
import { useRouter } from 'vue-router'; 
import { handleSuccess, handleError } from '../utils/utils';
import popUpError from '../elements/popUpError.vue'; 
import popUpSuccess from '../elements/popUpSuccess.vue';

// Références pour le formulaire
const name = ref('');
const email = ref('');

// Références pour les pop-ups
const popupErrorRef = ref(null); 
const popupSuccessRef = ref(null); 
const router = useRouter();

// Fonction pour ajouter un utilisateur
const addUser = async () => {
    if (!name.value || !email.value) {
        handleError(popupErrorRef, 'Veuillez remplir tous les champs.');
        return;
    }

    try {
        await addUserApi(name.value, email.value); 
        name.value = '';
        email.value = '';

        // Affichage de la pop-up de succès
        handleSuccess(popupSuccessRef, 'Utilisateur ajouté avec succès !');

    } catch (error) {
        handleError(popupErrorRef, 'Erreur lors de l\'ajout de l\'utilisateur.', error);
    }
};
</script>

<template>
    <div class="container">
        <h1>Ajouter un utilisateur</h1>
        
        <!-- Formulaire d'ajout d'un utilisateur -->
        <div class="form-group">
            <input v-model="name" placeholder="Nom" />
            <input v-model="email" placeholder="Email" />
            <button @click="addUser">Ajouter</button>
        </div>

        <!-- Pop-ups pour afficher les erreurs et succès -->
        <popUpError ref="popupErrorRef" />
        <popUpSuccess ref="popupSuccessRef" />
    </div>
</template>

<style scoped>
.container {
  text-align: center;
  max-width: 500px;
  margin: auto;
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
  text-decoration: none;
  margin: 1em;
}

button:hover {
  background: #4aa371;
}
</style>