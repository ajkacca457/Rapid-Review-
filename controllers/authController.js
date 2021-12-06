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
    // --send only token not cookie
    // const token= user.getSignedJwtToken();
    // res.status(200).json({
    //     success:true,
    //     token:token
    // })

    //send cookie with token
    sendTokenResponse(user, 200, res);
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
// --sending only token without cookie
//    const token = user.getSignedJwtToken(); 
//    res.status(200).json({
//        success:true,
//        token: token
//    })

sendTokenResponse(user, 200, res);


});



// controller for getting loggedin user detail 

exports.getCurrentUser=asyncHandler(async (req,res,next)=> {
    let user= await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        data: user
    })

})


// controller for getting forget password  

exports.forgetPassword=asyncHandler(async (req,res,next)=> {
    let user= await User.findOne({
        email:req.body.email
    });

    if(!user) {
        return next(new ErrorResponse("User is no found with this email",404))
    }

    const resetToken= user.getResetPasswordToken();
    console.log(resetToken);

    await user.save({
        validateBeforeSave:false 
    })

    res.status(200).json({
        success: true,
        data: user,
        token: resetToken
    })

})

//get cookie from model, create and send cookie

const sendTokenResponse= (user,statusCode,res)=> {
    const token = user.getSignedJwtToken(); 
    const options= {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*20*60*60*1000),
        httpOnly:true
    };
    if(process.env.NODE_ENV==="production") {
        options.secure=true;
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        token
    })
}