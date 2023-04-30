const express = require('express');
const BigPromise = require('../util/bigPromise');
const stripe = require('stripe')();
const stripeKey = require('stripe')(process.env.STRIPE_SECRET);

exports.sendStripeKey = BigPromise(async(req,res)=>{
    res.status(200).json({
        stripeKey: process.env.STRIPE_PUBLIC_KEY
    })
})

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys


// exports.session = await stripe.checkout.sessions.create({
//   shipping_address_collection: {allowed_countries: ['IN']},
//   shipping_options: [
//     {
//       shipping_rate_data: {
//         type: 'fixed_amount',
//         fixed_amount: {amount: 0, currency: 'inr'},
//         display_name: 'Free shipping',
//         delivery_estimate: {
//           minimum: {unit: 'business_day', value: 5},
//           maximum: {unit: 'business_day', value: 7},
//         },
//       },
//     },
//     {
//       shipping_rate_data: {
//         type: 'fixed_amount',
//         fixed_amount: {amount: 1500, currency: 'inr'},
//         display_name: 'Next day air',
//         delivery_estimate: {
//           minimum: {unit: 'business_day', value: 1},
//           maximum: {unit: 'business_day', value: 1},
//         },
//       },
//     },
//   ],
//   line_items: [
//     {
//       price_data: {currency: 'usd', product_data: {name: 'T-shirt'}, unit_amount: 2000},
//       quantity: 1,
//     },
//   ],
//   mode: 'payment',
//   success_url: 'https://example.com/success',
//   cancel_url: 'https://example.com/cancel',
// });
exports.paymentIntents = BigPromise(async(req,res)=>{
    const transactionList = await stripeKey.paymentIntents.list({
        limit: 1,
    });

    res.status(200).json({
        success: "true",
        data: transactionList
    })
}); 
exports.capturePayment = BigPromise(async(req,res)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr'
    });
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
}) 