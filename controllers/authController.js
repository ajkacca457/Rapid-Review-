const User = require("../models/User");
const ErrorResponse= require("../utils/ErrorResponse");
const asyncHandler= require("../middlewares/asyncHandler");
const sendEmail= require("../utils/sendEmail");
const crypto= require("crypto");

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

    const resetUrl= `${req.protocol}://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;

    const message= `You are recieveing this email because you have requested to reset your password.
    please make a put request to : \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email:user.email,
            subject:"token for password reset",
            message
        })

        res.status(200).json({
            suceess:true,
            message:"reset token sent to email"
        })
        
    } catch (error) {
        console.log(error);
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire= undefined;

       await user.save({
           validateBeforeSave:false
       });
       
    return next(new ErrorResponse("Email could not be sent",500));
    }

    res.status(200).json({
        success: true,
        data: user,
        token: resetToken
    })

})

// controller for resetting password 

exports.resetPassword=asyncHandler(async (req,res,next)=> {
    const resetPasswordToken= crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
    
    
    let user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt:Date.now()}
    })

    if(!user) {
     return next(new ErrorResponse("Invalid token",400))   
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save()

    sendTokenResponse(user, 200, res);

})


// Update user details for loggedin user 

exports.updateDetails=asyncHandler(async (req,res,next)=> {

    const filedsToUpdate= {
         name:req.body.name,
        email:req.body.email
    }

    let user= await User.findByIdAndUpdate(req.user.id,filedsToUpdate, {
        new: true,
        runValidators:true
    });

    res.status(200).json({
        success: true,
        data: user
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