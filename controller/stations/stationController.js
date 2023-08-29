const stationModel = require("../../DB/Model/stationsModel");
const validateStation = require("../../utils/stationValidation");
const e = require("express");
//get all stations
const allStations = async (req, res) => {
  try {
    const stations = await stationModel.find();
    res.json({ message: "All stations", data: stations });
  } catch (errors) {
    res.json({ message: "errors", ...errors });
  }
};
/////get station by id
const stationById = async (req, res) => {
  let { id } = req.params;
  try {
    const station = await stationModel.findOne({ _id: id });
    res.json({ message: "one station By Id", data: station });
  } catch (errors) {
    res.json({ message: "errors", ...errors });
  }
};
//create station
const addNewStation = async (req, res) => {
  try {
    let {
      station_name,
      station_AR,
      address,
      address_AR,
      longitude,
      latitude,
      Plugs,
      number_of_Plugs,
      availability,
      Amenities,
      Amenities_AR,
      Description,
      Description_AR,
      phone,
      cost,
    } = req.body;
    number_of_Plugs = +number_of_Plugs
    var station = new stationModel({
      station_name,
      station_AR,
      address,
      address_AR,
      longitude,
      latitude,
      Plugs,
      number_of_Plugs,
      availability,
      Amenities,
      Amenities_AR,
      Description,
      Description_AR,
      phone,
      cost,
    });
    var stationValid = validateStation(station);
    if (stationValid) {
      console.log(stationValid);
      await station.save();
      res.status(201).send("station  Added Successfully");
    } else {
      res.send(validateStation.errors);
    }
  } catch (err) {
    res.json({ message: "added error", ...err });
  }
};
////////////////update Station

const updateStation = async (req, res) => {
  let { id } = req.params;
  console.log({ id });
  let {
    station_name,
    station_AR,
    address,
    address_AR,
    longitude,
    latitude,
    Plugs,
    number_of_Plugs,
    availability,
    Amenities,
    Amenities_AR,
    Description,
    Description_AR,
    phone,
    cost,
  } = req.body;

  number_of_Plugs = +number_of_Plugs
  try {
    const validate = validateStation({
     
      station_name,
      station_AR,
      address,
      address_AR,
      longitude,
      latitude,
      Plugs,
      number_of_Plugs,
      availability,
      Amenities,
      Amenities_AR,
      Description,
      Description_AR,
      phone,
      cost,
    });
    
    if (validate) {
      const station = await stationModel.updateOne(
        { _id: id },
        {
          station_name,
          station_AR,
          address,
          address_AR,
          longitude,
          latitude,
          Plugs,
          number_of_Plugs,
          availability,
          Amenities,
          Amenities_AR,
          Description,
          Description_AR,
          phone,
          cost,
        }
      );
      res.json({ message: "updated sucess", station });
    } else {
      res.json({ message: validateStation.errors });
    }
  } catch (err) {
    res.json({ message: "updated error", ...err });
  }
};

const deleteStation = async (req, res) => {
  let { id } = req.params;
  try {
    const station = await stationModel.deleteOne({ _id: id });
    res.json({ message: "deleted sucess", station });
  } catch (errors) {
    res.json({ message: "deleted error", ...errors });
  }
};
module.exports = {
  allStations,
  deleteStation,
  addNewStation,
  updateStation,
  stationById,
};
