const express = require('express');
const app = require('./app');

const {PORT} = process.env;

app.listen(PORT, (req,res)=>{
    console.log(`connected at PORT ${PORT}`);
});

