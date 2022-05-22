const { response } = require("express");
const { request } = require("express");
const jwt=require("jsonwebtoken");


module.exports=(request,response,next)=>{
   let token,decodedToken;
   console.log("/////////////////////////////////////////////////////////////////////////////////////");
    console.log(request.get("Authorization"));

    console.log("/////////////////////////////////////////////////////////////////////////////////////");
   
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
console.log("token:"+token)
console.log("request:"+request)
console.log(request.role)
request.role=decodedToken.role;
next();

}