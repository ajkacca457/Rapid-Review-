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

exports.getReview=(req,res,next)=> {
    let singleReview= data[+req.params.id-1]

    res.status(200).json({success:true, data:singleReview})
}

exports.updateReview=(req,res,next)=> {
    res.status(200).json({success:true, message:`your movie review ${req.params.id} is updated`})
}

exports.deleteReview=(req,res,next)=> {
    res.status(200).json({success:true, message:`your movie review ${req.params.id} is deleted`})
}