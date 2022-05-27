const express=require("express");
const router=express.Router();


const authMW=require("../MiddleWares/authMiddleWare");
const controller=require("../Controllers/studentController");

const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");

// router.use(authMW);

router.route("/students")

.get(controller.getAllStudents)
.post(
    // body("id").isInt().withMessage("id should be intger"),
    controller.createStudent)


router.put("/students/:id" ,authMW,controller.updateStudent)
router.delete("/students/:id",authMW,controller.deleteStudent)
router.get("/students/:id",authMW,controller.getStudentById)


module.exports=router;