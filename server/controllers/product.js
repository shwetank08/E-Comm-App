const express = require("express");
const BigPromise = require("../util/bigPromise");
const CustomError = require("../util/customError");
const cloudinary = require("cloudinary");
const Product = require("../model/product");

exports.addProduct = BigPromise(async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  if (!name || !description || !price || !stock || !category) {
    return new CustomError("All fields are required", 400);
  }

  let result;
  if (req.files) {
    let file = req.files.photos;
    result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "product",
    });
  }

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    photo: {
      id: result.public_id,
      secure_url: result.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    product,
  });
});
