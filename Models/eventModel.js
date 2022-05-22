const mongoose = require("mongoose");

let eventSchema = new mongoose.Schema({
    _id:Number,
    
    title:{type:String,required :true},
    date:String,
    // mainSpeakerId:mongoose.Types.ObjectId, 
    mainSpeakerId:Number, 
    // otherSpeakersId:[mongoose.Types.ObjectId],
    otherSpeakersId:[Number],
    studentsId:[Number]
})
module.exports=mongoose.model("events",eventSchema);