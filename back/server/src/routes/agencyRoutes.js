const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');

router.get("/", agencyController.getAllAgencies);
router.put("/users/:id/agency", agencyController.updateUserAgency);
router.post('/', agencyController.createAgency);

module.exports = router;