const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUser);
router.get('/:projectId', userController.getProjectUser)

module.exports = router