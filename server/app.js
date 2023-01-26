require('dotenv').config();
require('./config/database').connect();

const express = require('express');


const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const user = require('./routes/user');
const product = require('./routes/product');
const order = require('./routes/order');
const payment = require('./routes/payment');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

app.use('/api',user)
app.use('/api',product)
app.use('/api',order)
app.use('/api',payment)

module.exports = app;