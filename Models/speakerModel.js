const mongoose = require("mongoose");

let speakerSchema = new mongoose.Schema({
    // _id:mongoose.Types.ObjectId,
    _id:Number,
    email:{type:String,unique :true},
    username:String,
    password:String, 
    city: String, 
    street:String , 
    building:String
})
module.exports=mongoose.model("speakers",speakerSchema);