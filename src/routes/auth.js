const router = require('express').Router();
const authController = require('../controller/AuthController');

router.post('/login', authController.login);
router.post('/registry', authController.registry);

module.exports = router;
