/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faEllipsis,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
// Icon set for profile pic
import { Avatar } from "primereact/avatar";

export default function MealPlanDays({ meal, userImage }) {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const renderMealsForDay = (day) => {
    return meal
      .filter((item) => item.selectedDay.name.toLowerCase() === day)
      .map((item, index) => (
        <div key={index} id="mealplan-task">
          <div className="mealplan-title">
            <h3>{item.foodName}</h3>
            <span>
              <FontAwesomeIcon icon={faEllipsis} />
            </span>
          </div>
          <span id="mealplan-tag" className={item.tag}>
            {item.tag}
          </span>
          {item.foodImage ? (
            <img
              src={item.foodImage}
              alt={item.foodName}
              style={{ width: "100%", marginTop: "0.5rem" }}
            />
          ) : (
            <div>
              <br />
              <br />
            </div>
          )}

          <div className="mealplan-nutriscore-img">
            <div id="mealplan-nutriinfo">
              <span id="nutriscore">
                <FontAwesomeIcon icon={faFireFlameCurved} id="caloriesIcon" />
              </span>
              <a href="/Profile">
                <Avatar
                  image={userImage}
                  size="large"
                  shape="circle"
                  style={{ width: "35px", height: "35px" }}
                />
              </a>
            </div>
          </div>
        </div>
      ));
  };
  return (
    <div>
      <div className="weekly-plan">
        {daysOfWeek.map((day) => (
          <div key={day} id={day}>
            <div className="day-of-week">
              <p>{day.charAt(0).toUpperCase() + day.slice(1)}</p>
            </div>
            {renderMealsForDay(day)}
          </div>
        ))}
      </div>
    </div>
  );
}
