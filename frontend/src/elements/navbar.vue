<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/users">Utilisateurs</router-link></li>
    </ul>
    <form @submit.prevent="handleSearch" role="search" class="search-form">
      <input id="search" type="search" v-model="searchQuery" placeholder="Search..." required />
      <button type="submit">Go</button>
    </form>
    <router-link to="/connexion"><button class="connexion-form">Connexion</button></router-link>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  users: Array
});

const searchQuery = ref('');
const router = useRouter();

const handleSearch = () => {
  const query = searchQuery.value.toLowerCase();
  const filteredUsers = props.users.filter(user =>
    user.name.toLowerCase().includes(query)
  );
  console.log('Filtered users:', filteredUsers);
  // Rediriger vers une page de résultats si besoin
};
</script>
<style>
/* ============================= */
/* 🌍 VARIABLES CSS GLOBALES */
/* ============================= */

:root {
  --rad: 0.7rem; /* Rayon de bordure arrondie */
  --dur: 0.3s; /* Durée des transitions */
  --color-dark: #2f2f2f; /* Couleur principale sombre */
  --color-light: #fff; /* Couleur principale claire */
  --color-brand: #57bd84; /* Couleur verte d'origine pour la barre de recherche */
  --font-fam: "Lato", sans-serif; /* Police principale */
  --height: 3rem; /* Hauteur de la barre de recherche */
  --btn-width: 6rem; /* Largeur du bouton */
  --bez: cubic-bezier(0, 0, 0.43, 1.49); /* Courbe d'accélération pour les animations */
  --font-size: 1rem; /* Taille de police de base */
  --border-width: 2px; /* Largeur de la bordure */
}
</style>
<style scoped>

/* ============================= */
/* 🎨 STYLISATION DE LA NAVBAR */
/* ============================= */

.navbar {
  background: #333; /* Couleur de fond sombre */
  padding: 5px 20px; /* Espacement réduit à l'intérieur */
  width: 100%; /* Prend toute la largeur */
  position: fixed; /* Fixe la navbar en haut de l'écran */
  top: 0;
  left: 0;
  z-index: 1000; /* Assure qu'elle reste au-dessus des autres éléments */
  display: flex;
  justify-content: space-between; /* Aligne les éléments aux extrémités */
  align-items: center; /* Centre verticalement */
  box-sizing: border-box; /* Inclut le padding dans les dimensions */
  height: 4rem; /* Hauteur réduite de la navbar */
  overflow: hidden; /* Évite tout débordement */
}

/* Liste des liens dans la navbar */
.navbar ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
  font-family: var(--font-fam);
  font-size: var(--font-size);
}

/* Style des éléments de la liste */
.navbar li {
  display: inline;
}

/* Style des liens */
.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 12px;
  transition: 0.3s; /* Animation fluide au survol */
}

/* Effet au survol */
.navbar a:hover {
  background: #555;
  border-radius: 5px; /* Arrondi du fond au survol */
}
/* ============================= */
/* 🔍 STYLISATION DE LA BARRE DE RECHERCHE */
/* ============================= */

.search-form {
  position: relative;
  width: 18rem; /* Largeur réduite de la barre de recherche */
  background: var(--color-brand);
  border-radius: var(--rad);
  box-sizing: border-box;
  display: flex; /* Assure que les éléments sont bien alignés */
  align-items: center; /* Centre verticalement les éléments */
  justify-content: flex-start; /* Aligne le champ de recherche à gauche */
  padding: 0; /* Pas de padding pour éviter le débordement */
}

/* Styles communs aux champs input et bouton */
.search-form input,
.search-form button {
  height: var(--height); /* Utilise la hauteur définie dans les variables */
  font-family: var(--font-fam);
  border: 0;
  color: var(--color-dark);
  font-size: var(--font-size);
}

/* 🔘 STYLE DE L'INPUT */
.search-form input {
  outline: 0;
  width: 100%;
  background: var(--color-light);
  padding: 0 1.2rem;
  border-radius: var(--rad);
  transition: all var(--dur) var(--bez);
  z-index: 1;
  position: relative;
}

/* 📌 STYLE DU BOUTON */
.search-form button {
  display: none; /* Masqué par défaut */
  position: absolute;
  top: 0;
  right: 0;
  width: var(--btn-width);
  font-weight: bold;
  background: var(--color-brand);
  border-radius: 0 var(--rad) var(--rad) 0;
  color: var(--color-light);
  cursor: pointer;
  outline: none;
  box-shadow: none;
}

.search-form button:active {
  background: var(--color-light);
  color: var(--color-brand);
}

/* ⚡️ ANIMATION: Quand l'utilisateur tape, le bouton apparaît */
.search-form input:not(:placeholder-shown) {
  border-radius: var(--rad) 0 0 var(--rad); /* Ajuste les bords */
  width: calc(100% - var(--btn-width)); /* Réduit la largeur pour laisser de la place au bouton */
}

/* Rend le bouton visible uniquement quand l'input est rempli */
.search-form input:not(:placeholder-shown) + button {
  display: block;
  z-index: 10;
}

/* ============================= */
/* 🚪 STYLISATION DU BOUTON DE CONNEXION */
/* ============================= */

.connexion-form {
  background: var(--color-brand);
  color: var(--color-light);
  border: var(--border-width) solid var(--color-brand);
  border-radius: var(--rad);
  padding: 0.5rem 1rem;
  font-family: var(--font-fam);
  font-size: var(--font-size);
  cursor: pointer;
}

.connexion-form:hover {
  background: var(--color-light);
  color: var(--color-brand);
  border-color: var(--color-brand);
  border-width: var(--border-width);
  border-style: solid;
  border-radius: var(--rad);
}

.connexion-form:active {
  background: var(--color-brand);
  color: var(--color-light);
  border-color: var(--color-brand);
  border-width: var(--border-width);
  border-style: solid;
  border-radius: var(--rad);
}

.connexion-form:focus {
  outline: none;
  box-shadow: none;
}

</style>