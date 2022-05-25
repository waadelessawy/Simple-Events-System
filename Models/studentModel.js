const mongoose=require("mongoose");


 let studentSchema=new mongoose.Schema({
    _id:Number,
    username:{type:String,unique:true},
    email:{type:String,unique:true},
    password:String,   
    role:String
 
 });

module.exports=mongoose.model("students",studentSchema)
