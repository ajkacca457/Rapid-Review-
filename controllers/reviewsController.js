const Reviews = require("../models/reviewModel");
const ErrorResponse= require("../utils/ErrorResponse");


exports.getReviews= async (req,res,next)=> {
    let allReviews=await Reviews.find();
    try {
        res.status(200).json({success:true, data:allReviews, message:"Here are all of your reviews"});
        if(!allReviews) {
            return res.status(400).json({
                success:false
            })            
        }
    }
    catch(error) {
        next(error)
    }
}

exports.postReview=async (req,res,next)=> {
    try {
        let newReview= await Reviews.create(req.body);
        if(!newReview){
            return res.status(400).json({
                success:false
            })
        }
        res.status(201).json({success:true,
                            data:newReview,
                            message:"your movie review is created"})
                        }
    catch(error) {
        next(error)
    }
    
}

exports.getReview=async (req,res,next)=> {
    try {
        let indReview= await Reviews.findById(req.params.id);
        if(!indReview){
        //sends if the request is not formatted properly but not exits
            return res.status(400).json({success:false})
        }
        res.status(200).json({success:true, data:indReview, message:"Single Review send"})
        
    } catch (error) {
        //sends if the request is not formatted or something unacceptable
            next(error) 
    }
   
}

exports.updateReview= async (req,res,next)=> {

    try {
        let updateReview=await Reviews.findByIdAndUpdate(req.params.id,req.body, {
            new:true,
            runValidators:true
        })
        if(!updateReview){
            return res.status(400).json({
                success:false
            })

        }
        res.status(200).json({success:true,data:updateReview, message:`your movie review is updated`})    
    } catch (error) {
        next(error)    
    }
}

exports.deleteReview=async (req,res,next)=> {
    try {
        let delReview=await Reviews.findByIdAndDelete(req.params.id);
        if(!delReview){
            return res.status(400).json({
                success:false            
            })

        }
        res.status(200).json({success:true,data:{}, message:`your movie review is deleted`})    
    } catch (error) {
        res.status(404).json({
            success:false,
            error:error
        })     
    }
}