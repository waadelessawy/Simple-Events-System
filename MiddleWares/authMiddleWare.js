const { response } = require("express");
const { request } = require("express");
const jwt=require("jsonwebtoken");


module.exports=(request,response,next)=>{
   let token,decodedToken;
 if(request.method != "OPTIONS"){
   try
   {
       token=request.get("Authorization").split(" ")[1];
       console.log("toooken",token)
       console.log("tooauth",request.get("Authorization").split("Bearer"))
  
       decodedToken= jwt.verify(token,"myNameIsWaad");
       console.log(decodedToken)
       request.role=decodedToken.role;

   }
   catch(error)
   {
       next(new Error("Not Authenticated"))
        
   }

}
next();
 

}