<template>
    <div class="user-details-container">
        <h1>Détails de l'utilisateur</h1>
        <div v-if="user" class="user-card">
            <img v-if="user.image" :src="user.image" alt="Avatar utilisateur" class="user-image" />
            <div class="form-group">
                <div class="form-item">
                    <label for="name">Nom :</label>
                    <input v-model="user.name" id="name" class="user-input" placeholder="Nom" />
                </div>
                <div class="form-item">
                    <label for="email">Email :</label>
                    <input v-model="user.email" id="email" class="user-input" placeholder="Email" />
                </div>
                <div class="form-item">
                    <label for="image">Image :</label>
                    <input type="file" accept="image/*" @change="handleFileUpload" id="image" />
                </div>
                <button class="save-button" @click="saveUser">Sauvegarder</button>
            </div>
            <router-link to="/users"><button class="back-button">Retour</button></router-link>
        </div>
        <popUpError ref="popupErrorRef" />
    </div>
</template>

<script setup>

import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchUserById, updateUser } from '../api';
import { handleError, handleSuccess, arrayBufferToBase64 } from '../utils/utils.js';
import popUpError from '../elements/popUpError.vue';

const popupErrorRef = ref(null);
const popupSuccessRef = ref(null);
const user = ref(null);
const route = useRoute();
const router = useRouter();

// Fonction pour charger les détails de l'utilisateur
const loadUserDetails = async () => {
    try {
        const userId = Number(route.params.id);
        if (!userId || isNaN(userId)) {
            throw new Error('ID utilisateur invalide');
        }
        
        const userData = await fetchUserById(userId);
        if (!userData) {
            throw new Error(`Aucun utilisateur trouvé avec l'ID ${userId}`);
        }
        
        user.value = userData;
        if (user.value.image && typeof user.value.image !== 'string') {
            user.value.image = 'data:image/png;base64,' + arrayBufferToBase64(user.value.image);
        }
    } catch (error) {
        handleError(popupErrorRef, 'Erreur lors de la récupération des détails de l\'utilisateur.', error);
    }
};

watchEffect(() => {
    const userId = route.params.id;
    if (userId) {
        loadUserDetails();
    }
});

// Fonction pour sauvegarder les modifications
const saveUser = async () => {
    if (!user.value.name || !user.value.email) {
        handleError(popupErrorRef, "Veuillez remplir tous les champs.");
        return;
    }

    const formData = new FormData();
    formData.append("name", user.value.name);
    formData.append("email", user.value.email);

    if (user.value.imageFile) {
        formData.append("image", user.value.imageFile);
    } else if (user.value.image.startsWith("data:image")) {
        formData.append("image", user.value.image);
    }

    console.log("Données envoyées :", {
        name: user.value.name,
        email: user.value.email,
        image: user.value.imageFile ? user.value.imageFile.name : "Aucune image modifiée"
    });

    try {
        await updateUser(user.value.id, formData);
        
        handleSuccess(popupSuccessRef, "Utilisateur mis à jour avec succès !");
        router.push(`/users/${user.value.id}`);
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        handleError(popupErrorRef, "Erreur lors de la mise à jour de l'utilisateur.", error);
    }
};

// Fonction pour mettre à jour l'image de profil
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        user.value.imageFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            user.value.image = reader.result; // Mettre à jour l'image d'aperçu si nécessaire
        };
        reader.readAsDataURL(file);
    }
};

</script>

<style scoped>
.user-details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
}

.user-card {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;
}

.user-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}

.form-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
}

label {
    font-weight: bold;
    width: 80px;
    text-align: left;
}

.user-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 300px;
    font-size: 16px;
    text-align: left;
}

.save-button {
    background: #57bd84;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    width: 100%;
}

.save-button:hover {
    background: #4aa371;
}

@media (max-width: 600px) {
    .user-image {
        width: 100px;
        height: 100px;
    }
}

@media (min-width: 1200px) {
    .user-image {
        width: 180px;
        height: 180px;
    }
}

.back-button {
    margin-top: 15px;
    padding: 10px 15px;
    border: none;
    background-color: #57bd84;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.back-button:hover {
    background-color: #4aa371;
}
</style>