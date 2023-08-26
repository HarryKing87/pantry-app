import Navigation from "./Navigation";
import "./CSS/dashboard.css";
import ImageScroller from "./DashboardPremium";
import DashboardFree from "./DashboardFree";

const MainDashboard = () => {
  const isUserPremium = false;
  return (
    <>
      <Navigation />
      {isUserPremium ? <ImageScroller /> : <DashboardFree />}
    </>
  );
};

export default MainDashboard;
