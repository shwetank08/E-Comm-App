const express = require('express');
const app = require('./app');
const cloudinary = require('cloudinary');
const {PORT, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env;

cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

app.listen(PORT, (req,res)=>{
    console.log(`connected at PORT ${PORT}`);
});

