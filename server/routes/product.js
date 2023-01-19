const express = require('express');
const { addProduct } = require('../controllers/product');
const {isLoggedIn} = require('../controllers/user');
const router = express.Router();

router.post('/addproduct', isLoggedIn, addProduct);

module.exports = router;
