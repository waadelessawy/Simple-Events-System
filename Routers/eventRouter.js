const express=require("express");
const router=express.Router();
const controller=require("../Controllers/eventController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");

router.route("/events")
.get(controller.getAllEvents)
.post(body("id").isInt().withMessage("id should be intger"),
controller.createEvent)
.put(controller.updateEvent)
.delete(controller.deleteEvent)

module.exports=router;