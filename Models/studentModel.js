const mongoose=require("mongoose");


 let studentSchema=new mongoose.Schema({
    _id:Number,
    username:String,
    email:{type:String,unique:true},
    password:String,   
 
 });

module.exports=mongoose.model("students",studentSchema)
