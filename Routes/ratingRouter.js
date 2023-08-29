const { addRating, getRating } = require("../controller/rating/ratingController");
const router = require("express").Router();
const { auth } = require("../middlware/auth");
router.post('/rateStation',auth(['admin','user']),addRating);
router.get('/rateStation/:stationId',getRating);

module.exports=router