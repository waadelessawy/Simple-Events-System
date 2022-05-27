const jwt = require('jsonwebtoken');
const Student = require("../Models/studentModel");
const Speaker = require("../Models/speakerModel");
const studentController = require("../Controllers/studentController");
const speakerController = require("../Controllers/speakerController");
const bcrypt = require('bcrypt');


module.exports.login = (request, response, next) => {

  let token;


  if (request.body.email == "waad.elessawy@gmail.com" && request.body.password == "123") {

    token = jwt.sign({
      _id: 1,
      email: request.body.email
      , role: "admin"
    },
      "ColdPlayIsTheBest",
      { expiresIn: "1h" });


    response.status(200).json({ msg: "login", token, role: "admin" })

  }

  else {

    Student.findOne({ email: request.body.email })
      .then(data => {

        if (data != null && bcrypt.compareSync(request.body.password, data.password)) {

          token = jwt.sign({
            _id: 1,
            email: request.body.email
            , role: "student"
          },
            "ColdPlayIsTheBest",
            { expiresIn: "1h" });
          response.status(200).json({ msg: "login", token, role: "student" })


        } else {

          Speaker.findOne({ email: request.body.email })
            .then(data => {
              if (data == null || !bcrypt.compareSync(request.body.password, data.password))
                throw new Error("username and password are incorrect");
              else {

                token = jwt.sign({
                  _id: 1,
                  email: request.body.email
                  , role: "speaker"
                },
                  "ColdPlayIsTheBest",
                  { expiresIn: "1h" });
                response.status(200).json({ msg: "login", token, role: "speaker" })


              }

            })
            .catch(error => next(error))



        }



      })
      .catch(error => next(error))


  }


}


