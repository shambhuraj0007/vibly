const express = require('express');
const { loginUser, logout } = require('../controllers/authController');
const { registerUser } = require('../controllers/authController');

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);

module.exports = router;
