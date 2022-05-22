const express=require("express");
const router=express.Router();
const controller=require("../Controllers/eventController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");
const authMW=require("../MiddleWares/authMiddleWare");



router.use(authMW);
router.route("/events")

.get(controller.getAllEvents)
.post(
    //  body("id").isInt().withMessage("id should be intger"),
controller.createEvent)
router.put("/events/:id",controller.updateEvent)
router.delete("/events/:id",controller.deleteEvent)
router.get("/events/:id",controller.getEventById)
module.exports=router;