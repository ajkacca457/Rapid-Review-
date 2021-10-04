const express= require("express");
const router= express.Router();

const {getReviews, postReview,getReview,updateReview,deleteReview} = require("../controllers/reviewsController");

router.route("/")
.get(getReviews)
.post(postReview)

router.route("/:id").get(getReview).put(updateReview).delete(deleteReview)


module.exports= router;