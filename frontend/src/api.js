// src/api.js
export const fetchUsers = async () => {
    try {
        const res = await fetch('http://localhost:9000/users');
        return await res.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        throw error; // Vous pouvez lancer l'erreur pour la gérer ailleurs
    }
};

export const addUser = async (name, email) => {
    try {
        const response = await fetch('http://localhost:9000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:9000/users/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        throw error;
    }
};