const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const stripe = require("stripe")(process.env.API_KEY);
app.use(express.static(path.join(__dirname, "public")));

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: "price_1SOM3OCPUlgPkhlPfA8lx5ET",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(3000, () => console.log("Running on port 3000"));
