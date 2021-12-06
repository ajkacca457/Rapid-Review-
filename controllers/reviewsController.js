const Reviews = require("../models/reviewModel");
const ErrorResponse= require("../utils/ErrorResponse");
const asyncHandler= require("../middlewares/asyncHandler");


exports.getReviews= asyncHandler(async (req,res,next)=> {
        res.status(200).json(res.advancedResults);
        if(!res.advancedResults) {
            return res.status(400).json({
                success:false
            })            
        }
}) 

exports.postReview=asyncHandler(async (req,res,next)=> {
    // Add user to req.body
    req.body.user=req.user.id;

    let newReview= await Reviews.create(req.body);
    res.status(201).json({success:true,
                        data:newReview,
                        message:"your movie review is created"})
                    }) 
    

exports.getReview=asyncHandler(
    async (req,res,next)=> {
        let indReview= await Reviews.findById(req.params.id);
        if(!indReview){
        //sends if the request is not formatted properly but not exits
            return new ErrorResponse(`the id of ${req.params.id} is badly formatted or non existent. Try with the right id.`, 404)
        }

        res.status(200).json({success:true, data:indReview, message:"Single Review send"})
})    

exports.updateReview= asyncHandler(
    async (req,res,next)=> {
        let updateReview=await Reviews.findById(req.params.id);
           if(!updateReview){
               return next(new ErrorResponse(`the id of ${req.params.id} is badly formatted or non existent. Try with the right id.`, 404))
           }

           // makes sure user is review owner

           if(updateReview.user.toString()!==req.user.id) {
            return next(new ErrorResponse(`User is not authorized to update ${req.params.id}. Login with your own account.`, 404)) 
           }

           updateReview= await Reviews.findOneAndUpdate(req.params.id,req.body, {
            new:true,
            runValidators:true
           })

           res.status(200).json({success:true,data:updateReview, message:`your movie review is updated`})          
   }
) 

exports.deleteReview=asyncHandler(
    async (req,res,next)=> {
        let delReview=await Reviews.findById(req.params.id);
        if(!delReview){
            return next(new ErrorResponse(`the id of ${req.params.id} is badly formatted or non existent. Try with the right id.`, 404))
        }
        if(delReview.user.toString()!==req.user.id) {
            return next(new ErrorResponse(`User is not authorized to delete ${req.params.id}. Login with your own account.`, 404)) 
           }
        
           delReview=await Reviews.findByIdAndDelete(req.params.id);

        res.status(200).json({success:true,data:{}, message:`your movie review is deleted`})    
    } 
)    
