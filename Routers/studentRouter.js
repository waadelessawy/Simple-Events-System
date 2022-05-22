const express=require("express");
const router=express.Router();


const authMW=require("../MiddleWares/authMiddleWare");
const controller=require("../Controllers/studentController");

const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");

router.use(authMW);

router.route("/students")

.get(controller.getAllStudents)
.post(
    // body("id").isInt().withMessage("id should be intger"),
    controller.createStudent)
// router.get("/student/:id",controller.getStudentById)

router.put("/students/:id",controller.updateStudent)
router.delete("/students/:id",controller.deleteStudent)
router.get("/students/:id",controller.getStudentById)


module.exports=router;