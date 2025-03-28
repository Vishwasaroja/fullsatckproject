const mongoose = require('mongoose');

const dbURL = process.env.DB_URL;

const connectDB= async()=>{
    try{
   await mongoose.connect(dbURL);
   console.log('connected to db');
    }catch(err){
console.log('Db connection failed ',err);
    }
}


module.exports =connectDB;