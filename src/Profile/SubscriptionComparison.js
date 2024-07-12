import React from "react";
import PriceCard from "./PriceCard";

const features = [
  { name: "Learn how the app works", free: true, paid: true },
  { name: "Learn food saving tips", free: true, paid: true },
  { name: "Learn food storage tips", free: true, paid: true },
  { name: "View personal profile", free: false, paid: true },
  { name: "Dashboard by food type", free: false, paid: true },
  { name: "Access hundreds of foods", free: "Limited", paid: true },
  {
    name: "Save food items",
    free: "Limited",
    paid: "Yes (categorized by type)",
  },
  { name: "Expiry notifications", free: false, paid: true },
  { name: "Food/Drink information", free: "Limited", paid: true },
  { name: "Add/Remove from list", free: "Limited", paid: true },
];

function SubscriptionComparison() {
  const title = "Subscription Comparison";
  const price = "Free"; // Or any relevant price

  return (
    <div className="subscription-comparison">
      <PriceCard title={title} price={price} features={features} />
    </div>
  );
}

export default SubscriptionComparison;
