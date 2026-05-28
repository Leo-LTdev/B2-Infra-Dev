const { Task, Project, User } = require('../models');

exports.getAllTasks = async (req, res) => {
    try {
        const projectId = req.params.id;

        const project = await Project.findOne({where: { id: projectId } });
        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé"});
        }

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

        res.status(200).json({
            message: "Tâches récupérées avec succès !",
            tasks : tasks
        });
    } catch (error) {
        res.status(500).json({ error:  error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const projectId = req.params.id;

        const { title, description } = req.body;

        const project = await Project.findOne({where: { id: projectId } });
        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé"});
        }

        if (project.ownerId != req.auth.userId) {
            return res.status(403).json({ message: "vous n'avez pas les droit pour crée une tâche à ce projet"});
        }  

        const task = await Task.create({
            title,
            description,
            projectId
        });

        console.log("apré la recup des donné ")

        res.status(201).json({
            message: "Tâche crée avec succès !",
            task : task
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        
        const task = await Task.findOne({where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée"});
        }

        const project = await Project.findOne({where: { id: task.projectId } });

        if (project.ownerId != req.auth.userId) {
            return res.status(403).json({ message: "vous n'avez pas les droit pour modifier une tâche à ce projet"});
        }  

        await task.update({
            title: req.body.title || task.title,
            description: req.body.description || task.description,
            status: req.body.status || task.status
        });

        res.status(200).json({
            message: "Tâche mise à jour avec succès !",
            task: task
        });

    } catch (error) {
        res.status(500).json({ error:  error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {

        const taskId = req.params.taskId;

        const task = await Task.findOne({where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée"});
        }

        const project = await Project.findOne({where: { id: task.projectId } });

        if (project.ownerId != req.auth.userId) {
            return res.status(403).json({ message: "vous n'avez pas les droit pour supprimer une tâche à ce projet"});
        }

        await task.destroy();
        
        res.status(200).json({
            message: "Tâche supprimée avec succès !",
            task : task
        });
    } catch (error) {
        res.status(500).json({ error:  error.message });
    }
};

exports.assignTo = async (req, res) => {
    try {

        const taskId = req.params.taskId;
        const assigneTo = req.params.userId;
        const user = await User.findOne({ where: {id: assigneTo} });

        const task = await Task.findOne({ where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée"});
        }

        const project = await Project.findOne({where: { id: task.projectId } });
        if (project.ownerId != req.auth.userId) {
            return res.status(403).json({ message: "vous n'avez pas les droit pour supprimer une tâche à ce projet"});
        }

        const isParticipant = await project.hasParticipant(user);
        if (!isParticipant){
            return res.status(403).json({ message : "Cet utilisateur ne fait pas partie du projet" });
        }

        await task.update({ assigneTo: assigneTo })

        await task.reload({
            include: [
                {
                model: User,
                as: 'assignPseudo',
                attributes: ['pseudo']
                }
            ]
        });
        
        res.status(200).json({
            message: "attribution de tache avec succé",
            task : task
        });
    } catch (error) {
        res.status(500).json({ error:  error.message });
    }
};

exports.removeTo = async (req, res) => {
    try {

        const taskId = req.params.taskId;

        const task = await Task.findOne({ where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée"});
        }

        const project = await Project.findOne({where: { id: task.projectId } });
        if (project.ownerId != req.auth.userId) {
            return res.status(403).json({ message: "vous n'avez pas les droit changer le personne assigné"});
        }

        await task.update({ assigneTo: null })
        
        res.status(200).json({
            message: "attribution de tache retiré avec succé",
            task : task
        });
    } catch (error) {
        res.status(500).json({ error:  error.message });
    }
}

exports.changeStatus = async (req, res) => {
    try {

        const taskId = req.params.taskId;
        const taskStatus = req.params.status;

        const task = await Task.findOne({ where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée"});
        }



        await task.update({ status: taskStatus || task.status })
        
        res.status(200).json({
            message: "status changer avec succé",
            task : task
        });
    } catch (error) {
        res.status(500).json({ error:  error.message });
    }
}