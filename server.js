// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51MDByrCPUlgPkhlPzIse0YH4tvZYIJtr9pfW4JdrNuWZJhhYmx95l6d9ri8B9DHKMexbHM2bnRgNkU2Wd5jxLpAT002rNYJhHN"
);
const express = require("express");
const app = express();
app.use(express.static("public"));

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
