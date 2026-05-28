const sequelize = require('../config/db');
const User = require('./User');
const Property = require('./Property');
const Agency = require('./Agency');
const Sale = require('./Sale');


// ============================================================================
// 3. CONFIGURATION DES RELATIONS (Reflet exact de tes contraintes SQL)
// ============================================================================

Agency.hasMany(User, { foreignKey: 'agency_id', onDelete: 'SET NULL' });
User.belongsTo(Agency, { foreignKey: 'agency_id' });


Agency.hasMany(Property, { foreignKey: 'agency_id', onDelete: 'RESTRICT' });
Property.belongsTo(Agency, { foreignKey: 'agency_id' });


Property.hasOne(Sale, { foreignKey: 'property_id', onDelete: 'RESTRICT' });
Sale.belongsTo(Property, { foreignKey: 'property_id' });


User.hasMany(Sale, { foreignKey: 'agent_id', onDelete: 'RESTRICT' });
Sale.belongsTo(User, { foreignKey: 'agent_id' });

module.exports = {
  sequelize,
  Agency,
  User,
  Property,
  Sale
};