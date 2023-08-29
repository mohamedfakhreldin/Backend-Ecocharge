const router = require("express").Router();
const e = require("express");
const { payment } = require("../controller/payment/paymentController");
const { auth } = require("../middlware/auth");
router.post("/create-checkout-session",auth(["admin","user"]),payment );

module.exports = router;


