const express = require("express");
const BigPromise = require("../util/bigPromise");
const CustomError = require("../util/customError");
const cloudinary = require("cloudinary");
const Product = require("../model/product");

const {FOLDER} = process.env;

exports.addProduct = BigPromise(async (req, res) => {
  let result;

  if (!req.files) {
    return new CustomError("image required", 401);
  }

  let file = req.files.photos;
  result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: FOLDER,
  });

  const imageObj = {
    id: result.public_id,
    secure_url: result.secure_url,
  };
  req.body.photos = imageObj;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = BigPromise(async (req, res) => {
  let productToUpdate = await Product.findById(req.params.id);
  if(!productToUpdate){
    throw new CustomError("No product available", 400);
  }

  if (req.files) {
    // let res = await cloudinary.v2.uploader.destroy(productToUpdate.photos.id, {
    //   folder: FOLDER,
    // });
    let newImage;
    let file = req.files.photos;
    newImage = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: FOLDER,
    });

    const imageObj = {
      id: newImage.public_id,
      secure_url: newImage.secure_url,
    };

    req.body.photos = imageObj;
    let res = await cloudinary.v2.uploader.destroy(productToUpdate.photos.id, {
      folder: FOLDER,
    });
    console.log("image update success")
}
  console.log("REQ - BODY: ",req.body);
  const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    product,
  });
});
exports.deleteProduct = BigPromise(async(req,res)=>{
  let productToBeDeleted = await Product.findById(req.params.id);

  let deletePhoto = await cloudinary.v2.uploader.destroy(productToBeDeleted.photos.id,{
    folder: FOLDER
  })

  let deleteProduct = await Product.findByIdAndDelete(req,params.id);

  res.status(200).json({
    success:"true",
    deleteProduct
  })
});
exports.getAllProduct = BigPromise(async(req,res)=>{
  const page = req.query.page || 0;
  const perpage = req.query.limit || 6;

  const showAllProduct = await Product.find().skip(page*perpage).limit(perpage);
  if(!showAllProduct){
    throw new CustomError("No product not found", 400);
  }

  res.status(200).json({
    success:"true",
    showAllProduct
  })
});
exports.getOneProduct = BigPromise(async(req,res)=>{
  const showOneProduct = await Product.findById(req.params.id);
  if(!showOneProduct){
    throw new CustomError("No product not found", 400);
  }

  res.status(200).json({
    success:"true",
    showOneProduct
  })
});
