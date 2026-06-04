const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bien = sequelize.define('Bien', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('Residentiel', 'Professionnel'),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('Maison', 'Appartement', 'Bureau', 'Local commercial'),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    surface_sqm: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Disponible', 'Vendu', 'Réservé'),
      defaultValue: 'Disponible'
    },
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'biens',
  });

  return Bien;
};