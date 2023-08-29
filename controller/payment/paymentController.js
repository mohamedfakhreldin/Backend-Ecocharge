const stationModel = require("../../DB/Model/stationsModel");
const STRIPE_PRIVATE_KEY =
  "sk_test_51I2OqRBT0QsBiL7MWTqxj63fqMl7bXD5FlfcgxupBqQosN5avn2W2tUGXcH1lPSeA0qxUP4IxxMTjm55KZ8Okxlf00vIGmGBbN";

const stripe = require("stripe")(STRIPE_PRIVATE_KEY);

const YOUR_DOMAIN = process.env.SERVER_URL;

const payment = async (req, res) => {
    const { stationID, quantity, plug } = req.body;
    const station = await stationModel.findOne({ _id: stationID });
    const price = plug === "AC" ? 169 : 192;
  
    const stripeCheckoutShape = {
      quantity:Number(quantity)<50?50:Number(quantity),
      price_data: {
        currency: "egp",
        product_data: {
          name: `${station.get("station_name")} - ${plug}`,
          description: station.get("Description") || "description",
        },
        unit_amount: price,
      },
    };
  
    const session = await stripe.checkout.sessions.create({
      line_items: [stripeCheckoutShape],
      mode: "payment",
      // success_url: `${YOUR_DOMAIN}/success.html`,
      success_url:process.env.CLIENT_DOMAIN+`/`,
      // cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      cancel_url:process.env.CLIENT_DOMAIN+`/`
    });
  
    res.send({ url: session.url });
    // res.send(station);
  }
  module.exports={payment}