const express = require('express');
const { sendStripeKey, capturePayment, paymentIntents } = require('../controllers/payment');
const { isLoggedIn } = require('../middleware/user.auth');
const router = express.Router();

router.route('/stripekey').get(isLoggedIn, sendStripeKey);
router.route('/capturepayment').get(isLoggedIn, capturePayment);
router.route('/getpaymentdetail').get(isLoggedIn, paymentIntents);

module.exports = router;