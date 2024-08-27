

const express = require('express');
const { sequelize } = require('db.js');
const User = require('User.js'); // Assurez-vous que le chemin est correct

const app = express();

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Route d'inscription
app.post('register.js', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'Utilisateur déjà enregistré' });
        }

        // Créer un nouvel utilisateur
        user = await User.create({ username, email, password });

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            points: user.points,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

// Synchronisation avec la base de données et démarrage du serveur
sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}).catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
});

module.exports = app;

