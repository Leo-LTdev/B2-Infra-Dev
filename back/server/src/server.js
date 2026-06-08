require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { authRoutes, userRoutes, bienRoutes,agencyRoutes } = require('./routes')
const path = require('path');
const authMiddleware = require ('./middlewares/authMiddleware')


const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion BDD
sequelize.authenticate()
    .then(() => console.log('Connexion à MySQL réussie !'))
    .catch(err => console.error('Erreur BDD :', err));

// Routes
app.use('/api/auth', authRoutes);

app.use(authMiddleware);

app.use('/api/user', userRoutes);

app.use('/api/bien', bienRoutes);

app.use('/api/agencies', agencyRoutes);

const PORT = process.env.NODE_LOCAL_PORT;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});