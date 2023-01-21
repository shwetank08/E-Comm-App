const express = require('express');
const { addProduct, updateProduct, deleteProduct, getOneProduct, getAllProduct } = require('../controllers/product');
const {isLoggedIn, isAdmin } = require('../middleware/user.auth');
const router = express.Router();

router.post('/:id/addproduct', isAdmin, addProduct);
router.put('/:id/updateproduct', isAdmin, updateProduct);
router.delete('/:id/deleteproduct', isAdmin, deleteProduct);
router.get('/:id/getproduct', isAdmin, getOneProduct);
router.get('/getallproducts', isAdmin, getAllProduct);

module.exports = router;
