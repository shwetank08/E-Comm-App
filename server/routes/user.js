const express = require('express');
const { signup, signin, logout } = require('../controllers/user');
const { isLoggedIn, isAdmin } = require('../middleware/user.auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout',isLoggedIn, logout);

module.exports = router;