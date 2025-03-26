const mongoose = require('mongoose');


const threateSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
    },
    address:{
         type:String,
         required:true, 
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        
    },
    isActive:{
        type:Boolean,
        default:false
    },
},
{timestamps:true}
)


const Theatre = mongoose.model("theatres", threateSchema);

module.exports = Theatre