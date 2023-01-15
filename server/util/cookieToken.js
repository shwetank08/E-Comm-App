const express = require('express');
const {COOKIETIME} = process.env;


const cookieToken = (user,res) => {

    const option = {
        expires: new Date(Date.now()+COOKIETIME*60*60*1000),
        httpOnly: true
    }
    const token = user.getJwtToken();
    console.log(token);
    user.password = undefined;

    res.status(200).cookie("token",token,option).json({
        success: "true",
        token,
        user
      });
}

module.exports = cookieToken;