const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bien_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buyer_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    final_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    sale_date: {
      type: DataTypes.DATEONLY, 
      allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'sales',
    timestamps: false
  });

  return Sale;
};