const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
    .route("/signup")
    /////render signup page
    .get(userController.renderSignupForm)
    ////user signup
    .post(wrapAsync(userController.signup));

router
    .route("/login")
    ///render login
    .get(userController.renderLoginForm)
    ////login into wanderlust
    .post(saveRedirectUrl, 
        passport.authenticate("local", 
        { failureRedirect: "/login", failureFlash: true }), 
        userController.login);

// logout 
router.get("/logout", userController.logout)

module.exports = router;