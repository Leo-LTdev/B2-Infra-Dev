const express = require('express');
const router = express.Router({ mergeParams: true });
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

router.put('/:taskId/assignTo/:userId', taskController.assignTo)
router.put('/:taskId/removeTo', taskController.removeTo)
router.put('/:taskId/status/:status', taskController.changeStatus)

module.exports = router;