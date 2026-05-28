const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    projectId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'project_id',
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    assigneTo:{
        type: DataTypes.INTEGER,
        field: 'assigned_to',
        references: {
            model: 'users',
            key: 'id'
        }
    },
    status:{
        type: DataTypes.ENUM('A faire', 'En cours', 'Fait'),
        defaultValue: 'A faire'
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tasks'
})

module.exports = Task;