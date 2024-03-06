// TEST MODE
const stripe = require("stripe")(
  "sk_test_51Ik6M1DGpwrBbxcmOs6t6tHPgHAzKSjowSDY0ZWfrIIW4zzMPkqLwJ0eT7Dn7Ym0bSmakJP63j91IaErsc2ntNsg00FmjGvBEK"
);

const paymentIntent = await stripe.paymentIntents.create();
console.log("The payment intent: " + paymentIntent);

exports.handler = async (event, context) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "https://itspantry.netlify.app",
      cancel_url: "https://itspantry.netlify.app/profile",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1NjS6vDGpwrBbxcmyjQepCM7",
          quantity: 1,
        },
      ],
      mode: "subscription",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: session.id,
        status: session.status,
        metadata: session.metadata,
      }),
    };
  } catch (error) {
    console.error("Error creating session:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred", userPremium: false }),
    };
  }
};

/* TESTING FLOW
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Ik6M1DGpwrBbxcmOs6t6tHPgHAzKSjowSDY0ZWfrIIW4zzMPkqLwJ0eT7Dn7Ym0bSmakJP63j91IaErsc2ntNsg00FmjGvBEK"
);

app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/profile",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1NjS6vDGpwrBbxcmyjQepCM7",
          quantity: 1,
        },
      ],
      mode: "subscription",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
*/
