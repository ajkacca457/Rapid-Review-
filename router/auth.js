const express= require("express");
const  {registerUser,loginUser,getCurrentUser}= require("../controllers/authController");
const { protect } = require("../middlewares/auth");
const router= express.Router();

router.get("/me",protect,getCurrentUser);
router.post("/register",registerUser);
router.post("/login", loginUser);
module.exports= router; 