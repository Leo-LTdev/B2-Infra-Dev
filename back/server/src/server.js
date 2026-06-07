require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { authRoutes, userRoutes, bienRoutes } = require('./routes')
const path = require('path');



const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

console.log("--- VÉRIFICATION DES CHEMINS STATIQUES ---");
console.log("Le dossier du script server.js (__dirname) est :", __dirname);
console.log("Express cherche le dossier uploads ici :", path.join(__dirname, 'uploads'));
console.log("------------------------------------------");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion BDD
sequelize.authenticate()
    .then(() => console.log('Connexion à MySQL réussie !'))
    .catch(err => console.error('Erreur BDD :', err));

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);

app.use('/api/bien', bienRoutes);

const PORT = process.env.NODE_LOCAL_PORT;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});