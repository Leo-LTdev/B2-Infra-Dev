require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { authRoutes } = require('./routes')



const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Connexion BDD
sequelize.authenticate()
    .then(() => console.log('Connexion à MySQL réussie !'))
    .catch(err => console.error('Erreur BDD :', err));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.NODE_LOCAL_PORT;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});