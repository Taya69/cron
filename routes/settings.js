const express = require('express');
const router = express.Router();
const controllerReport = require('../controllers/report')

router.patch('/:id', controllerReport.updateOfSettings)
router.get('', controllerReport.getSettings)

module.exports = router