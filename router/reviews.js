const express= require("express");
const router= express.Router();
const advancedResults= require("../middlewares/advancedResults");
const Reviews= require("../models/reviewModel");

const {getReviews, postReview,getReview,updateReview,deleteReview} = require("../controllers/reviewsController");

router.route("/")
.get(advancedResults(Reviews),getReviews)
.post(postReview)

router.route("/:id")
.get(getReview)
.put(updateReview)
.delete(deleteReview)


module.exports= router;