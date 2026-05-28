const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const taskRoutes = require('./taskRoutes');


router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProject)
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

router.post('/:id/participants/:participantId', projectController.addParticipant);
router.delete('/:id/participants/:participantId', projectController.removeParticipant);

router.use('/:id/task', taskRoutes);

module.exports = router;