const express = require("express");
const router = express.Router();
const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const storage = require("../cloudConfig.js");

const upload = multer({ storage });

// const upload = multer({ dest: 'uploads/' });

router
    .route("/")
    //index route
    .get(wrapAsync(listingController.index))   
    //Create Route
    .post(isLoggedIn, 
        upload.single('listing[image]'), 
        validateListing,
        wrapAsync(listingController.createListing));
    /////THIS IS FOR FILE UPLOAD INTO LOCAL STORAGE


//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);  ///code replace into contrellers folder

router
    .route("/:id")
    //Show Route
    .get(wrapAsync(listingController.showListing))
    //Update Route
    .put(isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'), 
        validateListing, 
        wrapAsync(listingController.updateListing))
    //Delete Route
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;