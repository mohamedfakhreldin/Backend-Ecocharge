const ajv = require("ajv");
const AJV = new ajv();

var stationsSchema = {
  type: "object",
  properties: {
    station_name: {
      type: "string",
    },
    station_AR: {
      type: "string",
    },
    address: {
      type: "string",
    },
    address_AR: {
      type: "string",
    },
    longitude: {
      type: "string",
    },
    latitude: {
      type: "string",
    },
    number_of_Plugs: {
      type: "number",
    },
    availability: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    plugs: {
      type: "object",
    },
    Amenities: {
      type: "string",
    },
    Amenities_AR: {
      type: "string",
    },
    Description: {
      type: "string",
    },
    Description_AR: {
      type: "string",
    },
    cost: {
      type: "string",
    },
  },
  required: [
    "station_name",
    "address",
    "longitude",
    "latitude",
    "number_of_Plugs",
    "availability",
    "phone",
    'station_AR',
    'address_AR',
    'Amenities_AR',
  'Description_AR',
    "Amenities",
    "Description",
  
  ],
};
var validateStation = AJV.compile(stationsSchema);
module.exports = validateStation;
