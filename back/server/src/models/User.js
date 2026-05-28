const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Empêche d'avoir deux fois le même email
        validate: {
            isEmail: true // Vérifie que c'est bien un format email
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users', // Nom de ma table
});

module.exports = User;