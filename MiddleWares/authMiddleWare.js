const { response } = require("express");
const { request } = require("express");
const jwt=require("jsonwebtoken");


module.exports=(request,response,next)=>{
  let token,decodedToken;
 if(request.method != "OPTIONS"){
   try
   {
       token=request.get("Authorization").split(" ")[1];
   
       decodedToken= jwt.verify(token,"ColdPlayIsTheBest");

       request.role=decodedToken.role;

   }
   catch(error)
   {
       next(new Error("Not Authenticated"))
        
   }

}
next();
 
}