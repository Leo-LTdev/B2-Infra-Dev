const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Agency = sequelize.define('Agency', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_headquarter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'agencies',
  });

  return Agency;
};