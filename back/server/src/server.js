require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes')

const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Connexion BDD
sequelize.authenticate()
    .then(() => console.log('Connexion à MySQL réussie !'))
    .catch(err => console.error('Erreur BDD :', err));

// Routes
app.use('/auth', authRoutes);

app.use(authMiddleware); // middleware d'authentification

app.use('/project', projectRoutes);
app.use('/task', taskRoutes);
app.use('/user', userRoutes);

const PORT = process.env.NODE_LOCAL_PORT;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});