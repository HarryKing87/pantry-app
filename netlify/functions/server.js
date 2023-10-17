const stripe = require("stripe")(
  "sk_test_51Ik6M1DGpwrBbxcmOs6t6tHPgHAzKSjowSDY0ZWfrIIW4zzMPkqLwJ0eT7Dn7Ym0bSmakJP63j91IaErsc2ntNsg00FmjGvBEK"
);

exports.handler = async (event, context) => {
  const requestBody = JSON.parse(event.body);

  if (requestBody.action === "createSession") {
    // Handle subscription creation
    try {
      const session = await stripe.checkout.sessions.create({
        success_url: "https://itspantry.netlify.app",
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

      return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: session.id }),
      };
    } catch (error) {
      console.error("Error creating session:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "An error occurred" }),
      };
    }
  } else if (requestBody.action === "cancelSubscription") {
    // Handle subscription cancellation
    try {
      const subscriptionId = requestBody.subscriptionId; // Assuming you have the subscription ID in your request

      // Use the Stripe API to cancel the subscription
      const canceledSubscription = await stripe.subscriptions.del(
        subscriptionId
      );

      // Handle the canceledSubscription response, and update your database accordingly
      // You should mark the subscription as canceled in your database

      return {
        statusCode: 200,
        body: JSON.stringify({ status: "success" }),
      };
    } catch (error) {
      console.error("Error canceling subscription:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "An error occurred" }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid action" }),
    };
  }
};
