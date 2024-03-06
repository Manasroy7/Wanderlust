const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const { validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");



//////Middleware validation function for reviews


// post review route 
router.post("/", validateReview,isLoggedIn, wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));


module.exports = router;