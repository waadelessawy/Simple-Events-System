const express=require("express");
const router=express.Router();
const controller=require("../Controllers/speakerController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");
const authMW=require("../MiddleWares/authMiddleWare");



// router.use(authMW);
// router.route("")
router.route("/speakers")
.get(controller.getAllSpeakers)
.post(controller.createSpeaker)



router.delete("/speakers/:id",authMW,controller.deleteSpeaker)
router.get("/speakers/:id",authMW,controller.getSpeakerById)
router.put("/speakers/:id",authMW,controller.updateSpeaker)

module.exports=router;