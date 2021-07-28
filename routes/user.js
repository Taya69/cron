const express = require('express');
const router = express.Router();
const controllerAuth = require('../controllers/auth')

router.get('/:id', controllerAuth.getUserById)
router.post('/:id', controllerAuth.upDateUser)
router.get('', controllerAuth.getUsers)
module.exports = router