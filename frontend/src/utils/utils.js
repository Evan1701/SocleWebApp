import { fetchUsers } from '../api'; 

export async function handleError(popupRef, message, error) {
    if (popupRef.value) {
        popupRef.value.triggerErrorPopup(message);
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
