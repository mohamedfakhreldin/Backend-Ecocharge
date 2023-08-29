const router = require("express").Router();
const passport = require("passport");
const OAuthController = require('../controller/googleAuth/OAuthController');
const { route } = require("./authRouter");

router.get("/login/success",OAuthController.getToken);
router.get("/login/failed",OAuthController.failedLogin);

router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get(
	"/google/callback",
	passport.authenticate("google", {
	successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	}));


module.exports = router;
