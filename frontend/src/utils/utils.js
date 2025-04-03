import { fetchUsers } from '../api'; 

export async function handleError(popupRef, message, error) {
    if (popupRef && popupRef.value) {
        popupRef.value.triggerErrorPopup(message);
    } else {
        console.error('Popup reference is undefined or null');
    }
    console.error(message, error);
}

export async function handleSuccess(popupRef, message) {
    if (popupRef.value) {
        popupRef.value.triggerSuccessPopup(message);
    }
}

// Fonction pour récupérer la liste des utilisateurs et gérer les erreurs
export async function fetchUsersList(usersRef, popupRef) {
    try {
        usersRef.value = await fetchUsers();
    } catch (error) {
        handleError(popupRef, 'Erreur lors de la récupération des utilisateurs.', error);
    }
}

// Fonction pour récupérer un utilisateur par son ID et gérer les erreurs
export async function fetchUserByIds(usersRef, popupRef, id) {
    try {
        const user = await fetchUserById(id);
        usersRef.value = user;
    } catch (error) {
        handleError(popupRef, 'Erreur lors de la récupération de l\'utilisateur.', error);
    }
}

// Fonction pour convertir les données binaires en base64
export function arrayBufferToBase64 (buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer.data);  // Utiliser buffer.data pour accéder aux données
    const length = bytes.byteLength;
    for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);  // Convertir en base64
};
