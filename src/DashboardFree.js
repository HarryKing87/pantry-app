import React from "react";
import "./CSS/dashboard-free.css"; // Make sure to import your CSS file here

const DashboardFree = () => {
  return (
    <div className="free-user-container">
      <div className="free-user-content">
        <h3 className="free-user-title">Premium Feature</h3>
        <p className="free-user-text">
          This feature is only available to Premium members.
        </p>
        <a href="/upgrade" className="free-user-link">
          Upgrade to Premium
        </a>
      </div>
    </div>
  );
};

export default DashboardFree;
