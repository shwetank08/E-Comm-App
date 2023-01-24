const express = require('express');
const { createOrder, getLoggedInOrders, getOneOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/order');
const { isLoggedIn, isAdmin } = require('../middleware/user.auth');
const router = express.Router();

router.route("/:id/order/create").post(isLoggedIn, createOrder);
router.route("/myorder").get(isLoggedIn, getLoggedInOrders);
router.route("/order/:id").get(isLoggedIn, getOneOrder);
router.route("/admin/orders").get(isAdmin, getAllOrders);
router.route("/admin/order/:id/update").put(isAdmin, updateOrder);
router.route("/admin/order/:id/delete").delete(isAdmin, deleteOrder);

module.exports = router;