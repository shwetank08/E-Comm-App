const express = require("express");
const User = require("../model/user");
const BigPromise = require("../util/bigPromise");
const cookieToken = require("../util/cookieToken");
const CustomError = require("../util/customError");
const jwt = require("jsonwebtoken");

exports.signup = BigPromise(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new CustomError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("user already exists!", 400);
  }

  const newuser = await User.create({
    name,
    email,
    password,
  });
  console.log(newuser);

  cookieToken(newuser, res);
});
exports.signin = BigPromise(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("All fields are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomError("username or password incorrect", 400);
  }
  console.log(password);

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new CustomError("username or password incorrect", 400);
  }

  cookieToken(user, res);
});
exports.logout = BigPromise(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).send({
    logout: "success",
  });
});
exports.getAllUser = BigPromise(async(req,res)=>{
  const showAllUsers = await User.find();
  if(!showAllUsers){
    throw new CustomError("No user present", 400);
  }
  res.status(200).json({
    success: "true",
    showAllUsers,
  })
});
exports.getUser = BigPromise(async(req,res)=>{
  const showUser = await User.findById(req.params.id);
  if(showUser){
    throw new CustomError("No user present", 400);
  }
  res.status(200).json({
    success: "true",
    showUser,
  })
});


