const express = require('express');
const BigPromise = require('../util/bigPromise');
const stripe = require('stripe')();

exports.sendStripeKey = BigPromise(async(req,res)=>{
    res.status(200).json({
        stripeKey: process.env.STRIPE_PUBLIC_KEY
    })
})
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