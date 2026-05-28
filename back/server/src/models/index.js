const sequelize = require('../config/db');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');


Project.belongsTo(User, {
    foreignKey: 'owner_id', 
    as: 'owner'
});

User.hasMany(Project, {
    foreignKey: 'owner_id',
    as: 'ownedProjects'
});

Task.belongsTo(User, { 
  foreignKey: 'assigneTo',    
  as: 'assignPseudo'
});


Project.belongsToMany(User, {
    through: 'projects_users', // nom de la table sans oublier le timestamps false 
    foreignKey: 'project_id', 
    otherKey: 'user_id',      
    as: 'participants'         // Allias
});

User.belongsToMany(Project, {
    through: 'projects_users',
    foreignKey: 'user_id',     
    otherKey: 'project_id',    
    as: 'participatedProjects' 
});

module.exports = {
    sequelize,
    User,
    Project,
    Task
};