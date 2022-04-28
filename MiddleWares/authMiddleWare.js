const { response } = require("express");
const { request } = require("express");
const jwt=require("jsonwebtoken");


module.exports=(request,response,next)=>{
   let token,decodedToken;

   try
   {
       token=request.get("Authorization").split(" ")[1];
       decodedToken= jwt.verify(token,"myNameIsWaad");

   }
   catch(error)
   {
       next(new Error("Not Authenticated"))
        
   }
//authenticated
request.role=decodedToken.role;
next();

}