const express = require('express');
const router = express.Router();
const controllerReport = require('../controllers/report')

router.get('', controllerReport.generalReport)
//router.get('', controllerReport.generalReport)

module.exports = router