const mongoose = require("mongoose");

let eventSchema = new mongoose.Schema({
    _id:Number,
    title:{type:String,required :true},
    date:Date,
    mainSpeakerId:Number, 
    otherSpeakersId:[Number],
    studentsId:[Number]
})
module.exports=mongoose.model("events",eventSchema);