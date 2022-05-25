const jwt = require('jsonwebtoken');
const Student=require("../Models/studentModel");
const Speaker=require("../Models/speakerModel");
const studentController=require("../Controllers/studentController");
const speakerController=require("../Controllers/speakerController");

module.exports.login=(request,response,next)=>{

    let token;

     if(request.body.email=="waad.elessawy@gmail.com"&&request.body.password=="123")
     {
         token=jwt.sign({_id:1,
         email:request.body.email
         ,role:"admin"},
         "myNameIsWaad",
         {expiresIn:"1h"});
         console.log("token from controller",token)
         response.status(200).json({msg:"login",token,role:"admin"})
     }

     else{
         Student.findOne({email:request.body.email,password:request.body.password})
         .then(data=>{
             if(data==null)
             {

                Speaker.findOne({email:request.body.email,password:request.body.password})
                .then(data=>{
                    if(data==null)

                         throw new Error("username and password are incorrect");
                    token=jwt.sign({_id:1,
                        email:request.body.email
                        ,role:"speaker"},
                        "myNameIsWaad",
                        {expiresIn:"1h"});
                        response.status(200).json({msg:"login",token,role:"speaker"})
                })
                .catch(error=>next(error))

             }else{
                token=jwt.sign({_id:1,
                    email:request.body.email
                    ,role:"student"},
                    "myNameIsWaad",
                    {expiresIn:"1h"});
                    response.status(200).json({msg:"login",token,role:"student"})
    
                 
             }
     

             

         })
         .catch(error=>next(error))
     }
     
     {

     }


    
}
