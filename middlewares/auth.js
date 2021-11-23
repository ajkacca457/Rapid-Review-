const jsonwebtoken= require ("jsonwebtoken");
const asyncHandler= require("./asyncHandler");
const ErrorResponse= require("../utils/ErrorResponse");
const User=require("../models/User");


exports.protect=asyncHandler(async(req,res,next)=> {
let token;

if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token= req.headers.authorization.split(" ")[1];
}
// //check if cookie is there 
// else if(req.cookies.token) {
//     token=req.cookies.token;
// }

if(!token) {
   return next(new ErrorResponse("Not authorized to access the route", 401))
}

try {
let decoded= jsonwebtoken.verify(token,process.env.JWT_SECRET);
console.log(decoded);

req.user= await User.findById(decoded.id);
next();

} 
catch (error) {
    return next(new ErrorResponse("Not authorized to access the route", 401))
}

});