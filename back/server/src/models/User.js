const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Direction', 'Commercial', 'Communication & Marketing', 'Administratif - RH - Juridique', 'IT et Support'),
      allowNull: false
    },
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users',
  });

  return User;
};