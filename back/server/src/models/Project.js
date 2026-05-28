const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'owner_id',
        references: {
            model: 'users', 
            key: 'id'       
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "projects",
});

module.exports = Project;