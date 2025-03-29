const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API fonctionne 🚀' });
});

// Ajouter un utilisateur
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email });
        res.json(newUser);
    } catch (error) {
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