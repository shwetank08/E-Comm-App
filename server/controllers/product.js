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
    })


  const imageObj = {
      id: result.public_id,
      secure_url: result.secure_url,
  }
  req.body.photos = imageObj;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});
