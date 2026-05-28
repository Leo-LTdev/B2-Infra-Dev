const { Project, User } = require('../models/');
const { Op } = require('sequelize');

exports.getAllUser = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const allUser = await User.findAll({ where: { id: {[Op.ne]: userId}}})

        res.status(200).json({ 
            message: "Tous les utilisateur on été trouver",
            users: allUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getProjectUser = async (req, res) => {
    try {
        const projectId = req.params.projectId

        const project = await Project.findOne({ where: { id: projectId }})
        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé"});
        }

        const participants = await project.getParticipants({
            attributes: ['id', 'email', 'pseudo'],
            joinTableAttributes: [] // pour enlever la jointure du resulta
        });

        res.status(200).json({ 
            message: "Tous les utilisateur du projet on été trouver",
            participants: participants
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}