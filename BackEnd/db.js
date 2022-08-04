// we will connect to mongodb here

const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/MarkDysn"  // connecting string to connect to mongodb

// connecting ot mongodb 
const connectToMongo = ()=>{

    mongoose.connect(mongoURL, ()=>{
        console.log('connected to mongo successfully');
    })
}

module.exports = connectToMongo;  // now it can be acesscible outside