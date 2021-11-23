const express= require("express");
const router= express.Router();
const advancedResults= require("../middlewares/advancedResults");
const Reviews= require("../models/reviewModel");
const { protect }= require("../middlewares/auth");
const {getReviews, postReview,getReview,updateReview,deleteReview} = require("../controllers/reviewsController");

router.route("/")
.get(advancedResults(Reviews),getReviews)
.post(protect,postReview)

router.route("/:id")
.get(getReview)
.put(protect,updateReview)
.delete(protect,deleteReview)


module.exports= router;