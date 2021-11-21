const User = require("../models/User");
const ErrorResponse= require("../utils/ErrorResponse");
const asyncHandler= require("../middlewares/asyncHandler");

//register new user and get token
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
});


// sign in and get token 

exports.loginUser=asyncHandler(async (req,res,next)=> {
    const {email,password}=req.body;
    if(!email || !password) {
        return next(new ErrorResponse("provide email and password",400))
    }
    const user=await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorResponse("invalid credintial", 400));
    }

    const isMatch= await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse("invalid credintial",400))
    }

   const token = user.getSignedJwtToken(); 
   res.status(200).json({
       success:true,
       token: token
   })

});

