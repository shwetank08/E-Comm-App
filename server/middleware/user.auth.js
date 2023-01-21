const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const BigPromise = require("../util/bigPromise");
const CustomError = require("../util/customError");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers["authorization"].split(" ")[1]);

  if (!token) {
    throw new CustomError("user not logged in", 400);
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decode._id, "name email role");
    next();
  } catch (err) {
    console.log(err);
    throw new CustomError("Not authorized to access this route", 400);
  }
});

exports.isAdmin = BigPromise(async (req, res, next) => {
    const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers["authorization"].split(" ")[1]);

  if (!token) {
    throw new CustomError("user not logged in", 400);
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decode._id, "name email role");
    if(req.user.role!="ADMIN"){
        throw new CustomError("Not authorized to access this route", 400)
    }
    next();
  } catch (err) {
    console.log(err);
    throw new CustomError("Not authorized to access this route", 400);
  }
});
