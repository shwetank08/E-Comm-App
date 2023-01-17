const express = require('express');
const { signup, signin, logout, isLoggedIn, isAdmin } = require('../controllers/user');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout',isLoggedIn, logout);
router.get('/isadmin',isAdmin);

module.exports = router;