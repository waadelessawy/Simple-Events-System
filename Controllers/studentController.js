const { response } = require("express");
const { query } = require("express");
const { request } = require("express");
const {validationResult}=require("express-validator");
const Student=require("../Models/studentModel");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const Event=require("../Models/eventModel");



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

module.exports.StudentEvents=(request,response,next)=>{
    Event.find({})
           .then((data)=>{
               for(let i = 0;i<data; i++){
                   for(let j=0 ; j<data[i].studentsId ;j++){
                       if(request.params._id == data[i].studentsId[j])
                       {
                        response.status(200).json(data[i]);
                       }

                   }


               }
             

           })
           .catch(error=>next(error))


    //    this.EventService.getAllEvents().subscribe(a=>{
//     //  this.events=a;
//      for(let i=0;i<a.length;i++){
//         for(let j=0;j<a[i].studentsId.length;j++){
//           if(this.parameterVal==a[i].studentsId[j]){
//             console.log(a[i].studentsId[j])
//             this.events.push(a[i]);
//           }
//         }
//      }
//    })
//  console.log(this.events)
   


}

module.exports.createStudent=(request,response,next)=>{
   
    Student.find({})
    .then((data)=>{
        for(let i =0;i<data.length;i++){
            if(data[i+1] == null && data !=null){
                let id = (data[i]._id) + 1;

                let student = new Student({
                            _id:id,
                            username:request.body.username,
                            email:request.body.email,
                            password:request.body.password 
                        })
        student.password= bcrypt.hashSync(student.password, salt);
        student.save()
        .then(data=>{
            response.status(201).json({ message: "student created", data });
        })
        .catch(error => next(error));

            }else{
                let id = 0;
            let student = new Student({
                _id: id,
                email: request.body.email,
                password:request.body.password,
                username:request.body.username
            })
            student.password= bcrypt.hashSync(student.password, salt);
            student.save()
            .then(data=>{
                response.status(201).json({ message: "student created", data });
            })
            .catch(error => next(error));

            }
        }
   

    })
  
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



