const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // Utiliser la mémoire pour stocker les fichiers
const Op = require('sequelize').Op;

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/heic', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
        console.error('Format de fichier non pris en charge:', file.mimetype);
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
            console.error('Requête invalide : manque name ou email', req.body);
            return res.status(400).json({ error: 'Le nom et l\'email sont requis.' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Aucune image téléchargée ou format invalide.' });
        }

        const { name, email } = req.body;
        const image = req.file.buffer;  // Données binaires de l'image
        
        const newUser = await User.create({ name, email, image });

        console.log('Nouvel utilisateur ajouté:', newUser);
        res.status(201).json(newUser); // Renvoie un statut de succès 201 pour la création
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de l\'utilisateur.' });
    }
});

// Détails d'un utilisateur
app.get('/usersDetails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Recherche de l'utilisateur par son ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        res.json(user); // Retourne les détails de l'utilisateur
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des détails de l\'utilisateur.' });
    }
});

// Supprimer un utilisateur
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Vérifie si l'utilisateur existe
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        await User.destroy({ where: { id } });
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'utilisateur.' });
    }
});

// Lister les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des utilisateurs.' });
    }
});

// Mettre à jour un utilisateur
app.put('/users/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        // Vérifie si l'utilisateur existe
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        // Met à jour les informations de l'utilisateur
        user.name = name || user.name;
        user.email = email || user.email;

        if (req.file) {
            user.image = req.file.buffer;  // Met à jour l'image uniquement si un nouveau fichier est téléchargé
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'utilisateur.' });
    }
});

// Filtrer les utilisateurs par nom
app.get('/users/search', async (req, res) => {
    const { name } = req.query;
    console.log('Recherche d\'utilisateur avec le nom:', name); // Log la valeur de 'name'

    try {
      if (!name) {
        return res.status(400).json({ error: 'Le nom est requis.' });
      }

      // Recherche insensible à la casse (ILIKE)
      const users = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      });

      console.log('Utilisateurs trouvés:', users); // Affiche les utilisateurs trouvés

      if (users.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
      }

      return res.json(users);

    } catch (error) {
      console.error('Erreur lors de la recherche des utilisateurs:', error);  // Affiche l'erreur complète
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Filtrer les utilisateurs par email
app.get('/users/searchEmail', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email || email.trim() === '') {
            return res.status(400).json({ error: 'L\'email est requis et ne peut pas être vide.' });
        }

        const users = await User.findAll({
            where: {
                email: {
                    [sequelize.Op.like]: `%${email}%`
                }
            }
        });

        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la recherche des utilisateurs:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la recherche des utilisateurs.' });
    }
});

// Lancer le serveur
const BACKEND_PORT = Number(process.env.VITE_BACKEND_PORT);
const BACKEND_URL = process.env.VITE_BACKEND_URL;
console.log(`Démarrage du serveur sur ${BACKEND_URL}:${BACKEND_PORT}`);
app.listen(BACKEND_PORT, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log(`🚀 Serveur démarré sur ${BACKEND_URL}:${BACKEND_PORT}`);
    } catch (error) {
        console.error('Erreur de connexion à la base de données:', error);
    }
});
