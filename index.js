require("dotenv").config();
const express = require("express");
const connectDB = require("./DB/connection");
const bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
const DashboardController = require('./controller/dashboard/DashboardController')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
const port = process.env.PORT || 5000;
connectDB();
const myPassport = require("./passport");
const passport = require("passport");
const cookieSession = require("cookie-session");
setTimeout(() => {
  
  
}, 10000);
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    methods: "GET,POST,PATCH,PUT,DELETE",
    credentials: true,
  })
);
app.get("/favicon.ico", (req, res) => {
  return "your faveicon";
});
// registeration
const registerRouter = require("./Routes/authRouter");
app.use("/api/users/auth", registerRouter);

const googleAuthRouter = require("./Routes/googleAuthRouter");
app.use("/auth", googleAuthRouter);
const tokenRouter = require("./Routes/tokenRouter")
app.use('/api/passwordtoken',tokenRouter)
const mapRouter = require("./Routes/mapRouter");
app.use("/api/map", mapRouter);

//stations
const stationsRouter = require("./Routes/stationsRouter");
app.use("/api/stations", stationsRouter);

//users
const userRouter=require("./Routes/userRouter")
app.use("/api/user",userRouter)

// payment
const paymentRouter = require("./Routes/paymentRouter");
app.use("/api/payment", paymentRouter);

// //rating
const ratingRouter = require("./Routes/ratingRouter");
app.use("/api/rating", ratingRouter);

// Email
const emailRouter = require("./Routes/emailRouter");
app.use("/api/email", emailRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
