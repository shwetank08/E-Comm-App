const express = require("express");
const BigPromise = require("../util/bigPromise");
const CustomError = require("../util/customError");
const cloudinary = require("cloudinary");
const Product = require("../model/product");

exports.addProduct = BigPromise(async (req, res) => {
  let result;

  if (!req.files) {
    return new CustomError("image required", 401);
  }

  let file = req.files.photos;
  result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "product",
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
  console.log(productToUpdate);
  if(!productToUpdate){
    throw new CustomError("No product available", 400);
  }

  if (req.files) {
    let res = await cloudinary.v2.uploader.destroy(productToUpdate.photos.id, {
      folder: "product",
    });
    let newImage;
    let file = req.files.photos;
    newImage = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "product",
    });

    const imageObj = {
      id: newImage.public_id,
      secure_url: newImage.secure_url,
    };

    req.body.photos = imageObj;
  }

  const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    product,
  });
});
