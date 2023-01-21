const express = require('express');
const { addProduct, updateProduct } = require('../controllers/product');
const {isLoggedIn, isAdmin } = require('../middleware/user.auth');
const router = express.Router();

router.post('/addproduct', isLoggedIn, addProduct);
router.put('/:id/updateproduct', isAdmin, updateProduct);

module.exports = router;
