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
  }

  if (requestBody.action === "cancelSubscription") {
    try {
      const subscriptionId = requestBody.subscriptionId; // Get the subscription ID from the request
      const canceledSubscription = await stripe.subscriptions.cancel(
        subscriptionId
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ canceledSubscription: canceledSubscription }),
      };
    } catch (error) {
      console.error("Error canceling subscription:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "An error occurred while canceling the subscription",
        }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid action" }),
    };
  }
};
