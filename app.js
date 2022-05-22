
const express = require("express");
const body_parser=require("body-parser");
const mongoose= require("mongoose");

const authRouter=require("./Routers/authRouter");
const studentRouter=require("./Routers/studentRouter");
const speakerRouter=require("./Routers/speakerRouter");
const eventRouter=require("./Routers/eventRouter");

const server=express();

//el connection promise lyha then

mongoose.connect("mongodb://localhost:27017/EventSystemDB")
        .then(()=>{
            console.log("DB connectd");
            server.listen(process.env.PORT||7000,()=>{
                console.log("I am Listening ....... ")
            });
        })
        .catch(error=>console.log("DB Connection problem"))



//Logger MW
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});
server.use((request,response,next)=>{

    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
    response.header("Access-Control-Allow-Headers","Content-Type,Authorization")
    next();

})
// // body parsing middleware
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));




//Routers
server.use(authRouter);
server.use(studentRouter);
server.use(speakerRouter);
server.use(eventRouter);

//Not Found MW
server.use((request,response)=>{
    response.status(404).json({meassge:"Page is Not Found"});
 });

//Error
server.use((error,request,response,next)=>{
    response.status(500).json({meassge:error+""});
});
