<template>
    <div v-if="showConfirmPopup" class="confirm-popup">
      <div class="popup-content">
        <h3>Confirmation</h3>
        <p>{{ confirmMessage }}</p>
        <button class="suppressionButton" @click="confirmAction">Suppression</button>
        <button class="closePopup" @click="closePopup">Annuler</button>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

  
  const showConfirmPopup = ref(false);
  const confirmMessage = ref('');
  const actionToConfirm = ref(null);
  
  // Fonction pour fermer la pop-up
  const closePopup = () => {
    showConfirmPopup.value = false;
    actionToConfirm.value = null;
  };
  
  // Fonction exécutée à la validation
  const confirmAction = async () => {
    if (!actionToConfirm.value) return;
    
    try {
        await actionToConfirm.value();
    } catch (error) {
        console.error("Erreur lors de l'exécution de l'action confirmée:", error);
    } finally {
        closePopup();
    }
};

// Fonction pour afficher la pop-up de confirmation et définir l'action
const triggerConfirmPopup = (message, action) => {
    confirmMessage.value = message;
    actionToConfirm.value = action;
    showConfirmPopup.value = true;
};
  
  // Expose la méthode pour l'utiliser ailleurs
  defineExpose({ triggerConfirmPopup });
  </script>
  
  <style scoped>
  .confirm-popup {
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
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin: 5px;
  }
  
  .popup-content button.closePopup {
      background: #4caf50; /* Couleur verte */
  }
  
  .popup-content button.closePopup:hover {
      background: #388e3c;
  }

  .popup-content button.suppressionButton {
      background: #e95354;
  }

  .popup-content button.suppressionButton:hover {
      background: #c44242;
  }
  </style>