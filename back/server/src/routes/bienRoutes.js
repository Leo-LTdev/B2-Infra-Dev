const express = require('express');
const router = express.Router();
const bienController = require('../controllers/bienController');
const  { upload } = require('../controllers/bienController');

// Routes pour les biens immobiliers
router.post('/', upload.single('image'), bienController.createBien);
router.get('/', bienController.getAllBiens);
// router.get('/:id', bienController.getBienById);
// router.put('/:id', bienController.updateBien);
// router.delete('/:id', bienController.deleteBien);

module.exports = router;