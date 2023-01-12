const mongoose = require('mongoose');
const {MONGO_URL} = process.env

exports.connect = (req,res) => {
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(console.log('DB Connected'))
    .catch(err=>{
        console.log(err);
        process.exit(1);
    })
}