const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: false, // Désactive la gestion de createdAt et updatedAt
            underscored: true, // fait la traduction camelcase <--> snakecase
        } 
    }
);

module.exports = sequelize;