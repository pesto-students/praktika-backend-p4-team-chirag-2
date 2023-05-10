const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');

/**
 * @openpi
 * /api/login
 * post:
 *  tags:
 *      -Users:
 *      summary: Login api for the user
 */
router.post('/api/login', AuthController.login);
/**
 * @openpi
 * /api/login
 * post:
 *  tags:
 *      -Users:
 *      summary: Registration api for the user
 */
router.post('/api/register', AuthController.register);

// router.post('/logout', AuthController.logout);
// router.post('/forgot-password', AuthController.forgotPassword);

module.exports = router;
