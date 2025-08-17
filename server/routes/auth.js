const express = require('express');
const { register, login, sendVerification, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/send-verification', sendVerification);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
