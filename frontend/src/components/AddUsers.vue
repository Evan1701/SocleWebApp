<template>
    <div class="container">
        <h1>Ajouter un utilisateur</h1>
        
        <!-- Formulaire d'ajout d'un utilisateur -->
        <div class="form-group">
            <input v-model="name" placeholder="Nom" />
            <input v-model="email" placeholder="Email" />
            <input type="file" accept="image/*" @change="handleFileUpload" />
            <div v-if="imagePreview">
                <img :src="imagePreview" alt="Aperçu" style="max-width: 100px; margin-top: 10px;" />
            </div>
            <button @click="addUser">Ajouter</button>
        </div>

        <!-- Pop-ups pour afficher les erreurs et succès -->
        <popUpError ref="popupErrorRef" />
        <popUpSuccess ref="popupSuccessRef" />
    </div>
</template>


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

// Fonction pour gérer le téléchargement de fichiers
const file = ref(null)
const imagePreview = ref(null);

const handleFileUpload = (event) => {
    file.value = event.target.files[0];
    console.log('Fichier sélectionné:', file.value);

    // Vérification des formats d'images valides (PNG, JPG, HEIC)
    const validTypes = ['image/png', 'image/jpeg', 'image/heic']; // Types acceptés
    if (file.value && !validTypes.includes(file.value.type)) {
        handleError(popupErrorRef, 'Format d\'image non pris en charge. Veuillez télécharger un fichier PNG, JPG ou HEIC.');
        file.value = null; // Annule la sélection du fichier
        imagePreview.value = null;
        return;
    }

    // Prévisualisation de l'image
    if (file.value) {
        imagePreview.value = URL.createObjectURL(file.value);
    }
}
// Fonction pour ajouter un utilisateur
const addUser = async () => {
    if (!name.value || !email.value || !file.value) {
        handleError(popupErrorRef, 'Veuillez remplir tous les champs.');
        return;
    }

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('image', file.value);

    console.log('Données envoyées:', {
        name: name.value,
        email: email.value,
        file: file.value ? file.value.name : 'Aucun fichier'
    });

    try {
        await addUserApi(formData); 
        name.value = '';
        email.value = '';
        file.value = null;
        imagePreview.value = null;

        // Affichage de la pop-up de succès
        handleSuccess(popupSuccessRef, 'Utilisateur ajouté avec succès !');

    } catch (error) {
        handleError(popupErrorRef, 'Erreur lors de l\'ajout de l\'utilisateur.', error);
    }
};
</script>



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