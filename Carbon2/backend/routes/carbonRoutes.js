const express = require('express');
const router = express.Router();
const carbonController = require('../controllers/carbonController');

router.post('/calculate', carbonController.calculateEmission);
router.get('/logs', carbonController.getAllLogs);

module.exports = router;