const express = require('express');

const Order = require("../model/order");
const Product = require("../model/product");
const BigPromise = require("../util/bigPromise");
const CustomError = require('../util/customError');

exports.createOrder = BigPromise(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  const userid = req.params.id;

  const order = await Order.create({
    shippingInfo,
    user: userid,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount
  });

  res.status(200).json({
    success: true,
    order
  })
});

exports.getOneOrder = BigPromise(async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(!order){
        throw new CustomError('Please check order ID', 401);
    }
    res.status(200).json({
        success: true,
        order
    })
});


exports.getAllOrders = BigPromise(async(req,res)=>{
    const order = await Order.find();
    if(!order){
        throw new CustomError('No Orders Found', 401);
    }
    res.status(200).json({
        success: true,
        order
    })
});


exports.getLoggedInOrders = BigPromise(async(req,res)=>{
    const order = await Order.find({user: req.user._id});
    if(!order){
        throw new CustomError('check order id', 401);
    }
    res.status(200).json({
        success: true,
        order
    })
});

exports.updateOrder = BigPromise(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order.orderStatus === 'Delivered'){
        throw CustomError('Order already has been marked delivered', 401);
    }

    order.orderStatus = req.body.orderStatus;

    order.orderItems.forEach(async prod => {
        await UpdateStock(prod.product, prod.quantity);
    });

    await order.save();

    res.status(200).json({
        success: true,
        order
    })

})

async function UpdateStock(productId, quantity){
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave: false});
}
