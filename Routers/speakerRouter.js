const express=require("express");
const router=express.Router();
const controller=require("../Controllers/speakerController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");
const authMW=require("../MiddleWares/authMiddleWare");
// const authRouter = require("../Routers/authRouter");



router.use(authMW);
// router.route("")
router.route("/speakers")
.get(controller.getAllSpeakers)
.post(controller.createSpeaker)



router.delete("/speakers/:id",controller.deleteSpeaker)
router.get("/speakers/:id",controller.getSpeakerById)
router.put("/speakers/:id",controller.updateSpeaker)

module.exports=router;