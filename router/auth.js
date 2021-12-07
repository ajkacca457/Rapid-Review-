const express= require("express");
const  {registerUser,loginUser,getCurrentUser,forgetPassword,resetPassword}= require("../controllers/authController");
const { protect } = require("../middlewares/auth");
const router= express.Router();

router.get("/me",protect,getCurrentUser);
router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/forgetpassword", forgetPassword);
router.put("/resetpassword/:resettoken", resetPassword);
module.exports= router; 