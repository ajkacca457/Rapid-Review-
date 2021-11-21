const User = require("../models/User");
const ErrorResponse= require("../utils/ErrorResponse");
const asyncHandler= require("../middlewares/asyncHandler");

exports.registerUser=asyncHandler(async(req,res,next)=> {

    res.status(200).json({
        success:true,
        message: "user has been created"
    })
})