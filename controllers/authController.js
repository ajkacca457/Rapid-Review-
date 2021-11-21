const User = require("../models/User");
const ErrorResponse= require("../utils/ErrorResponse");
const asyncHandler= require("../middlewares/asyncHandler");

exports.registerUser=asyncHandler(async(req,res,next)=> {
    const {name, email, password}= req.body;

    const user= await User.create({
        name,email,password
    });

    console.log(name,email,password);
    const token= user.getSignedJwtToken();
    res.status(200).json({
        success:true,
        token:token
    })
})