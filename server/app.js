require('dotenv').config();
require('./config/database').connect();
const user = require('./routes/user');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',user)

module.exports = app;