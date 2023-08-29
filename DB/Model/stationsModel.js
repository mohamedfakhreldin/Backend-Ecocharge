const mongoose = require("mongoose");
const stationSchema = new mongoose.Schema(
  {
    station_name: {
      type: String,
      required: true,
    },
  
      station_AR: {
        type: String,
        required: true,
      }
      ,
    address: {
      type: String,
      required: true,
    },
    address_AR: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    number_of_Plugs: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    Plugs: {
      type: Object,
      default: [
        "DC Quick Charge (CHAdeMo) variety of power ratings is 10-400KW",
        "DC Quick Charge(CCS/SAE Combo) variety of power ratings is 24-350 kW",
        "AC Mennekes(Type 2) variety of power ratings is 3.7-22KW"
      ],
    //  required: true,
    },
    Amenities: {
      type: String,
      required: true,
    },
    Amenities_AR: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Description_AR: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      default: {
        "AC_per_KW": "169-186 piasters",
        "DC_per_KW": "375 piasters"
      },
      //required: true,
    },
  },
  {
    timestamps: true,
  }
);
const stationModel = mongoose.model("Station", stationSchema);
module.exports = stationModel;
