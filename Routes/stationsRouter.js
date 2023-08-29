const stationController = require("../controller/stations/stationController");
const router = require("express").Router();
const { auth } = require("../middlware/auth");
router.get("/AllStations", stationController.allStations);
router.get("/station/:id", stationController.stationById);
router.post("/addstation", auth(["admin"]), stationController.addNewStation);
router.put(
  "/updateStation/:id",
  auth(["admin"]),
  stationController.updateStation
);
router.delete(
  "/deleteStation/:id",
  auth(["admin"]),
  stationController.deleteStation
);

module.exports = router;
