import React from "react";

const SubscriptionService = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch("/netlify/functions/server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { sessionId } = await response.json();
      alert(sessionId);
      window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}#fidkdWxOYHwnPyd1blpxYHZxWjA0TG4zSDRBQnVyd0dnfWZoSTN1fTx8ZzZ9fF1WVndiPTdOQ0tPNmtWM3NVf38za1NiTkA3YlJqN2ZRSGszVEpCfXRWbkN0dEldNWRqUl1BV3F8QTZ0KzczN0NiYXpXaVFzU2xlQWRsNGdPVXBtcyZvaG1mbDk2cXR0d2FgbGhlVw%3D%3D`;
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
