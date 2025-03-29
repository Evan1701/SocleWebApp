<script setup>
import { ref, onMounted } from 'vue';

// Déclaration des variables réactives pour stocker la liste des utilisateurs et les champs du formulaire
const users = ref([]);
const name = ref('');
const email = ref('');

// Fonction pour récupérer la liste des utilisateurs depuis l'API
const fetchUsers = async () => {
    try {
        const res = await fetch('http://localhost:9000/users'); // Appel API pour récupérer les utilisateurs
        users.value = await res.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error); // Gestion des erreurs
    }
};

// Fonction pour ajouter un nouvel utilisateur
const addUser = async () => {
    if (!name.value || !email.value) return; // Vérification que les champs ne sont pas vides
    console.log("Données envoyées :", { name: name.value, email: email.value });

    try {
        await fetch('http://localhost:9000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name.value, email: email.value }) // Envoi des données au serveur
        });
        name.value = '';
        email.value = '';
        fetchUsers(); // Rafraîchir la liste après l'ajout
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error); // Gestion des erreurs
    }
};

// Appel de la fonction fetchUsers() au montage du composant
onMounted(fetchUsers);
</script>

<template>
  <div class="container">
    <h1>Liste des utilisateurs</h1>
    
    <!-- Grille pour afficher les utilisateurs sous forme de cartes -->
    <div class="user-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <img :src="user.avatar || 'https://via.placeholder.com/150'" alt="Avatar utilisateur" class="user-image" />
        <h3 class="user-name">{{ user.name }}</h3>
      </div>
    </div>

    <h2>Ajouter un utilisateur</h2>
    
    <!-- Formulaire d'ajout d'un utilisateur -->
    <div class="form-group">
      <input v-model="name" placeholder="Nom" />
      <input v-model="email" placeholder="Email" />
      <button @click="addUser">Ajouter</button>
    </div>
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
