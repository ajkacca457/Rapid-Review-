const Reviews = require("../models/reviewModel");
const ErrorResponse= require("../utils/ErrorResponse");
const asyncHandler= require("../middlewares/asyncHandler");


exports.getReviews= asyncHandler(async (req,res,next)=> {
    let query;
    let reqQuery= {...req.query};
    let removeField=["select","sort"];
    removeField.forEach(item=>delete reqQuery[item]);
    
    query = Reviews.find(reqQuery);
   
    if(req.query.select) {
        let fields= req.query.select.split(",").join(" ");
        query=query.select(fields);
        console.log(req.query);
    }

    if(req.query.sort) {
        let sortBy= req.query.sort.split(",").join(" ");
        query=query.sort(sortBy);
    } else {
        query=query.sort("-createdAt");
    }


    let allReviews=await query;

        res.status(200).json({success:true,count:allReviews.length,data:allReviews, message:"Here are all of your reviews"});
        if(!allReviews) {
            return res.status(400).json({
                success:false
            })            
        }
}) 

exports.postReview=asyncHandler(async (req,res,next)=> {
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
        let updateReview=await Reviews.findByIdAndUpdate(req.params.id,req.body, {
               new:true,
               runValidators:true
           })
           if(!updateReview){
               return new ErrorResponse(`the id of ${req.params.id} is badly formatted or non existent. Try with the right id.`, 404)
   
           }
           res.status(200).json({success:true,data:updateReview, message:`your movie review is updated`})    
        
   }
) 

exports.deleteReview=asyncHandler(
    async (req,res,next)=> {
        let delReview=await Reviews.findByIdAndDelete(req.params.id);
        if(!delReview){
            return res.status(400).json({
                success:false            
            })

        }
        res.status(200).json({success:true,data:{}, message:`your movie review is deleted`})    
    } 
)    
