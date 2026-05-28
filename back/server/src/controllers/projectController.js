const { Project, User, Task } = require('../models/');
const { Op } = require('sequelize');


exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const ownerId = req.auth.userId; 

        if (!title) {
            return res.status(400).json({ message: "Le titre du projet est requis" });
        }

        const newProject = await Project.create({ title, description, ownerId });

        console.log("Nouveau projet créé :");

        await newProject.addParticipant(ownerId);
        console.log("owner ajouté au projet créé :");

        res.status(201).json({ 
            message: "Projet créé avec succès !",
            project: newProject
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllProjects = async (req, res) => {
    try {
        const ownerId = req.auth.userId;

        const ownedProjects = await Project.findAll({ where: { ownerId } });

        const invitedProjects = await Project.findAll({
            where: { ownerId: { [Op.ne]: ownerId } }, 
            include: [{     //jointure en sois pas trouver d'autre moyen pour faire la requete
                model: User,
                as: 'participants', // l'alias 
                where: { id: ownerId }, 
                attributes: [] // Prend pas les donnée du user
            }]
        })

        res.status(200).json({
            owned: ownedProjects,
            participated: invitedProjects
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getProject = async (req, res) => {
    try {
        const projectId = req.params.id;

        const project = await Project.findOne({ where: { id: projectId } });
        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé"});
        }

        // a rajouter vérification de si tu participe bien au projet

        res.status(200).json({
            message: "Project trouvé avec succé",
            project: project
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.auth.userId;

        const project = await Project.findOne({where: { id: projectId } });

        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé"});
        }

        if (project.ownerId != userId) {
            return res.status(403).json({ message: "vous n'avez pas les droit pour modifier ce projet"});
        }

        await project.update({
            title: req.body.title || project.title,
            description: req.body.description || project.description
        })

        res.status(200).json({
            message: "Projet mis à jour avec succès !",
            project : project
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.auth.userId;

        const project = await Project.findOne({where: { id: projectId } });

        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé"});
        }

        if (project.ownerId != userId) {
            return res.status(403).json({ message: "vous n'avez pas les droit pour supprimer ce projet"});
        }

        await project.destroy();

        res.status(200).json({
            message: "Projet supprimé avec succès !",
            project : project
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.addParticipant = async (req, res) => {
    try {
        const projectId = req.params.id;
        const currentUserId = req.auth.userId;
        const participantId = req.params.participantId;

        const project = await Project.findOne({ where: { id: projectId } });
        if (!project) {
            return res.status(404).json({ message: "Projet introuvable" });
        }
        if (project.owner_id != currentUserId) {
            return res.status(403).json({ message: "Seul le propriétaire peut ajouter des membres" });
        }

        await project.addParticipant(participantId);

        const participants = await project.getParticipants({
            attributes: ['id', 'email', 'pseudo'],
            joinTableAttributes: []
        });

        res.status(200).json({
            message: "Participant ajouté avec succès",
            project: project,
            participants: participants
         });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.removeParticipant = async (req, res) => {
    try {
        const projectId = req.params.id;
        const currentUserId = req.auth.userId;
        const participantId = req.params.participantId;

        const project = await Project.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ message: "Projet introuvable" });
        }

        if (project.owner_id != currentUserId && currentUserId != participantId) {
            return res.status(403).json({ message: "Action non autorisée" });
        }

        const userToDelete = await User.findOne({ where: { id: participantId } });

        await Task.update(
            { assigneTo: null }, 
            { 
                where: { 
                    projectId: projectId, 
                    assigneTo: participantId 
                } 
            }
        );

        const tasks = await Task.findAll({ 
            where: { projectId },
            include: [
                {
                    model: User,
                    as: "assignPseudo",
                    attributes: ["pseudo"]
                }
            ]
        });

        await project.removeParticipant(userToDelete);

        res.status(200).json({
            message: "Participant retiré du projet et tâches désassignées avec succès",
            tasks: tasks
         });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};