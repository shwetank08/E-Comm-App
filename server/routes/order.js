const express = require('express');
const { createOrder, getLoggedInOrders, getOneOrder } = require('../controllers/order');
const { isLoggedIn, isAdmin } = require('../middleware/user.auth');
const router = express.Router();

router.route("/:id/order/create").post(isLoggedIn, createOrder);
router.route("/myorder").post(isLoggedIn, getLoggedInOrders);
router.route("/order/:id").post(isLoggedIn, getOneOrder);
router.route("/admin/orders").post(isAdmin, getOneOrder);

module.exports = router;