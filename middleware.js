const Listing = require("./model/listing.js");
const Review = require("./model/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");



module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user);
    // console.log(req.originalUrl);
    if(!req.isAuthenticated()) {
        ////redirecturl save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing!")
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req, res, next)=> {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this Listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) =>{
        //// using Joi for validation
//////Middleware validation function for listings
    let {error} = listingSchema.validate(req.body);
    // console.log(result);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
};


module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    // console.log(result);

    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this Listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}