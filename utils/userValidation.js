const ajv = require("ajv");
const AJV = new ajv();

var usersShema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: "^[a-zA-Z]+$",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
      pattern:"^[A-Z][a-z0-9]{3,8}$"
    },
    cpassword: {
      type: "string",
    },
    // vehicleType: {
    //   type: "string",
    // },
    // chargerType: {
    //   type: "string",
    // },
    role: {
      type: "string",
    },
    image:{  type: "string" },
  },
  required: ["name", "email", "password"],
};
var validateUser = AJV.compile(usersShema);
module.exports = validateUser;
