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

// Fonction pour récupérer un utilisateur par son ID
export const fetchUserById = async (id) => {
    try {
        const res = await fetch(`http://localhost:9000/usersDetails/${id}`);
        if (!res.ok) {
            throw new Error('Utilisateur non trouvé');
        }
        return await res.json();
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        throw error;
    }
};


export const addUser = async (formData) => {
    console.log("FormData envoyé :");
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    const response = await fetch('http://localhost:9000/users', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Réponse serveur :", errorData);
        throw new Error(errorData.error || 'Erreur lors de l\'ajout de l\'utilisateur');
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

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (id, formData) => {
    if (!id) {
        throw new Error("ID utilisateur non défini pour la mise à jour");
    }
    
    console.log("ID utilisateur à mettre à jour :", id);
    console.log("Données envoyées :", Object.fromEntries(formData));

    try {
        const response = await fetch(`http://localhost:9000/usersDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        throw error;
    }
};