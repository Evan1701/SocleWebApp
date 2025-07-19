<script setup>
import { ref, onMounted } from 'vue';
import navbar from './elements/navbar.vue';
import { fetchUsersList } from './utils/utils.js';

const users = ref([]);

onMounted(async () => {
  // Récupérer les utilisateurs
  await fetchUsersList(users, null);  // ou gérer le popupRef pour afficher des erreurs
});
</script>

<template>
  <div>
    <navbar :users="users" />
    <router-view />
  </div>
</template>