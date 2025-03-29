<template>
  <div v-if="showErrorPopup" class="error-popup">
    <div class="popup-content">
      <h3>Erreur</h3>
      <p>{{ errorMessage }}</p>
      <button @click="closePopup">Fermer</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showErrorPopup = ref(false);
const errorMessage = ref('');

// Function to close the popup
const closePopup = () => {
  showErrorPopup.value = false;
};

// Function to trigger the error popup with a message
const triggerErrorPopup = (message) => {
  errorMessage.value = message;
  showErrorPopup.value = true;
};

// Export the triggerErrorPopup function so it can be used outside
defineExpose({ triggerErrorPopup });
</script>

<style scoped>
.error-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
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
  color: red;
}

.popup-content button {
  background: #f44336; /* Red color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.popup-content button:hover {
  background: #d32f2f;
}
</style>
