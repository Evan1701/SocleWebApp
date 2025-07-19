<template>
    <div class="container">
        <h1>Inscription</h1>
        
        <!-- Formulaire d'ajout d'un utilisateur -->
        <div class="form-group">
            <input v-model="name" placeholder="Nom" />
            <input v-model="email" placeholder="Email" />
            <input type="file" accept="image/*" @change="handleFileUpload" />
            <div v-if="imagePreview">
                <img :src="imagePreview" alt="Aperçu" style="max-width: 100px; margin-top: 10px;" />
            </div>
            <button>Inscrire</button>
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
</script>
    xs
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