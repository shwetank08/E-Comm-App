const express = require('express');
const { signup, signin, logout, getUser, getAllUser } = require('../controllers/user');
const { isLoggedIn, isAdmin } = require('../middleware/user.auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout',isLoggedIn, logout);
router.get('/:id/getuser',isLoggedIn, getUser);
router.get('/getusers',isLoggedIn, getAllUser);

module.exports = router;