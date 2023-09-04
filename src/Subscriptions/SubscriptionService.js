import React from "react";

const SubscriptionService = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:9999/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { sessionId } = await response.json();
      alert(sessionId);
      window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}#fidkdWxOYHwnPyd1blpxYHZxWjA0TG4zSDRBQnVyd0dnfWZoSTN1fTx8ZzZ9fF1WVndiPTdOQ0tPNmtWM3NVf38za1NiTkA3YlJqN2ZRSGszVEpCfXRWbkN0dEldNWRqUl1BV3F8QTZ0S2d3NTUyUGJqN200aicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl`;
    } catch (error) {
      console.error("Error initiating checkout:", error);
    }
  };

  return (
    <div>
      <h1>Stripe Checkout Example</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default SubscriptionService;
