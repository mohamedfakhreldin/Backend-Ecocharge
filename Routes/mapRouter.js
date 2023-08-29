const { getNearestStation } = require("../controller/map/mapController");
const { auth } = require("../middlware/auth");
const router = require("express").Router();


router.get('/:lnglat',auth(['admin','user']),getNearestStation);

module.exports=router