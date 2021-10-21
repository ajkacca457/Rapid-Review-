const Reviews = require("../models/reviewModel");


exports.getReviews= async (req,res,next)=> {
    let allReviews=await Reviews.find();
    try {
        res.status(200).json({success:true, data:allReviews, message:"Here are all of your reviews"})
    }
    catch(err) {
        res.status(404).json({success:false,error:err})
    }
}

exports.postReview=async (req,res,next)=> {
    try {
        let newReview= await Reviews.create(req.body);
        res.status(201).json({success:true,
                            data:newReview,
                            message:"your movie review is created"})
                        }
    catch(err) {
        res.status(404).json({
            error:err
        })
    }
    
}

exports.getReview=async (req,res,next)=> {
    try {
        let indReview= await Reviews.findById(req.params.id);
        res.status(200).json({success:true, data:indReview, message:"Single Review send"})
        
    } catch (error) {
        
        res.status(404).json({
            error:error
        })

    }

   
}

exports.updateReview=(req,res,next)=> {
    res.status(200).json({success:true, message:`your movie review ${req.params.id} is updated`})
}

exports.deleteReview=(req,res,next)=> {
    res.status(200).json({success:true, message:`your movie review ${req.params.id} is deleted`})
}