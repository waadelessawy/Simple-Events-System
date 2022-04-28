const express=require("express");
const router=express.Router();
const controller=require("../Controllers/speakerController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");

router.route("")
router.route("/speakers")
.get(controller.getAllSpeakers)
.post(body("id").isInt().withMessage("id should be intger"),
     controller.createSpeaker)
.put(controller.updateSpeaker)
.delete(controller.deleteSpeaker)

module.exports=router;