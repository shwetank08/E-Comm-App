const express = require("express");
const User = require("../model/user");
const BigPromise = require("../util/bigPromise");
const cookieToken = require("../util/cookieToken");
const CustomError = require("../util/customError");


exports.signup = BigPromise(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const existingUser = await User.findOne({email});
  if (existingUser) {
    return res.status(400).send("user already exists!");
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
  const {email, password } = req.body;
  if (!email || !password) {
    throw CustomError("All fields are required", 400);
  }

  const user = await User.findOne({email}).select("+password");
  if (!user) {
    throw CustomError("username or password incorrect", 400);
  }
  console.log(password)

  const isPasswordMatch = await user.comparePassword(password);
  if(!isPasswordMatch){
    throw CustomError("username or password incorrect", 400);
  }

  cookieToken(user, res);
});
exports.logout = BigPromise(async (req, res) => {
  res.cookie("token",null,{
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).send({
    logout: "success"
  })
});
