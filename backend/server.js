const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // Utiliser la mémoire pour stocker les fichiers

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/heic', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Format d\'image non pris en charge. Veuillez télécharger un fichier PNG, JPG ou HEIC.'), false);
    }
    cb(null, true); // Autorise le fichier
};

const upload = multer({ storage, fileFilter });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API fonctionne 🚀' });
});

// Ajouter un utilisateur
app.post('/users', upload.single('image'), async (req, res) => {
    try {
        console.log('Requête reçue avec body:', req.body);
        console.log('Fichier reçu:', req.file);

        if (!req.body.name || !req.body.email) {
            return res.status(400).json({ error: 'Le nom et l\'email sont requis.' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Aucune image téléchargée ou format invalide.' });
        }

        const { name, email } = req.body;
        const image = req.file.buffer;  // Données binaires de l'image
        
        const newUser = await User.create({ name, email, image });

        console.log('Nouvel utilisateur ajouté:', newUser);
        res.json(newUser);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Supprimer un utilisateur
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Lister les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Lancer le serveur
const PORT = 9000;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    } catch (error) {
        console.error('Erreur de connexion:', error);
    }
});