<template>
    <div v-if="showSuccessPopup" class="success-popup">
      <div class="popup-content">
        <h3>Succès</h3>
        <p>{{ successMessage }}</p>
        <button @click="closePopup">Fermer</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showSuccessPopup = ref(false);
  const successMessage = ref('');
  
  // Fonction pour fermer la pop-up
  const closePopup = () => {
    showSuccessPopup.value = false;
  };
  
  // Fonction pour afficher la pop-up de succès avec un message
  const triggerSuccessPopup = (message) => {
    successMessage.value = message;
    showSuccessPopup.value = true;
  };
  
  // Expose la méthode pour l'utiliser ailleurs
  defineExpose({ triggerSuccessPopup });
  </script>
  
  <style scoped>
  .success-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fond semi-transparent */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .popup-content h3 {
    color: green;
  }
  
  .popup-content button {
    background: #4caf50; /* Couleur verte */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .popup-content button:hover {
    background: #388e3c;
  }
  </style>