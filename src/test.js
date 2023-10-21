import React, { useState } from "react";

const SubscriptionService1 = () => {
  const [cancellationStatus, setCancellationStatus] = useState("");

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCancellationStatus(data.status);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  return (
    <div>
      {cancellationStatus ? (
        <p>Subscription cancellation status: {cancellationStatus}</p>
      ) : (
        <button onClick={handleCancelSubscription}>Cancel Subscription</button>
      )}
    </div>
  );
};

export default SubscriptionService1;
