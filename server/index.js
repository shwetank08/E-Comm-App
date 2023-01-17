const express = require('express');
const app = require('./app');
const cloudinary = require('cloudinary');
const {PORT} = process.env;

cloudinary.config({ 
    cloud_name: 'sample', 
    api_key: '874837483274837', 
    api_secret: 'a676b67565c6767a6767d6767f676fe1',
    secure: true
});

app.listen(PORT, (req,res)=>{
    console.log(`connected at PORT ${PORT}`);
});

