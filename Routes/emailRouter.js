const sendEmail = require("../controller/Email/emailController");

const router = require("express").Router();

router.post("/sendEmail", sendEmail);

module.exports = router;
