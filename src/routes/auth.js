const router = require('express').Router();
const authController = require('../controller/AuthController');

const checkAuth = require('../middleware/checkAuth');

router.post('/login', authController.login);
router.post('/registry', authController.registry);
router.post('/logout', checkAuth, authController.logout);
module.exports = router;
