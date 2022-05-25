const { response } = require("express");
const { query } = require("express");
const { request } = require("express");
const {validationResult}=require("express-validator");
const Student=require("../Models/studentModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


module.exports.getAllStudents=(request,response)=>{
 
    Student.find({})
           .then((data)=>{
               response.status(200).json(data);
          

           })
           .catch(error=>next(error))
    
}

module.exports.getStudentById=(request,response)=>{
    if(request.role !=="admin" && request.role !=="student")
    {
       throw new Error("Not Authorizd");
    }
    Student.findById({_id:request.params.id})
           .then(data=>{
               response.status(200).json(data);
               console.log(data);
           })

}



module.exports.createStudent=(request,response,next)=>{

  
   
    if(request.role !=="admin" && request.role !=="student")
    {
       throw new Error("Not Authorizd");
    }
    let result = validationResult(request);
    console.log(result);
    if(!result.isEmpty()){
        let message=result.array().reduce((current,error)=>current+error.msg," ");
        let error = new Error(message);
        error.status=422;
        throw error;
      

    }
    let student = new Student({
        _id:request.body._id,
        username:request.body.username,
        email:request.body.email,
        password:request.body.password ,

    })
   
    student.password= bcrypt.hashSync(student.password, salt);
 
    student.save()
    .then((data)=>{ 
        
        response.status(200).json({message:"student created",data})

    }).catch(error=>next(error));
}



module.exports.updateStudent=(request,response,next)=>{
    if(request.role !=="admin" && request.role !=="student" )
    {
       throw new Error("Not Authorizd");
    }

    Student.updateOne({_id:request.params.id},{
        $set:{
            username:request.body.username,
            email:request.body.email,
            password:bcrypt.hashSync(request.body.password, salt)
        }
    }).then(data=>{
        if(data.matchedCount==0)
        throw new Error("Student not exists");
        response.status(200).json({message:"Student updated",data});

    })
    .catch(error=>next(error))

        
}


module.exports.deleteStudent=(request,response,next)=>{

       if(request.role !=="admin" )
       {
           throw new Error("Not Authorizd");
       }
   
        Student.deleteOne({_id:request.params.id},{
          
        }).then(data=>{
             if(data.deletedCount==0)
            throw new Error("Student not exists");
            response.status(200).json({message:"Student deleted",data});
    
        })
        .catch(error=>next(error))
    
}



