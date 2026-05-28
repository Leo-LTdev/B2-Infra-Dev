const sequelize = require('../config/db');

const Agency = require('./Agency')(sequelize);
const User = require('./User')(sequelize);
const Property = require('./Property')(sequelize);
const Sale = require('./Sale')(sequelize);

// =============================
//  CONFIGURATION DES RELATIONS 
// =============================

// Relation Agence <-> Utilisateurs
Agency.hasMany(User, { foreignKey: 'agencyId', onDelete: 'SET NULL' });
User.belongsTo(Agency, { foreignKey: 'agencyId' });

// Relation Agence <-> Biens Immobiliers
Agency.hasMany(Property, { foreignKey: 'agencyId', onDelete: 'RESTRICT' });
Property.belongsTo(Agency, { foreignKey: 'agencyId' });

// Relation Biens Immobiliers <-> Ventes (1-to-1)
Property.hasOne(Sale, { foreignKey: 'propertyId', onDelete: 'RESTRICT' });
Sale.belongsTo(Property, { foreignKey: 'propertyId' });

// Relation Commercial (User) <-> Ventes
User.hasMany(Sale, { foreignKey: 'agentId', onDelete: 'RESTRICT' });
Sale.belongsTo(User, { foreignKey: 'agentId' });

// 4. On exporte TOUT d'un coup : la connexion ET les modèles configurés
module.exports = {
  sequelize,
  Agency,
  User,
  Property,
  Sale
};