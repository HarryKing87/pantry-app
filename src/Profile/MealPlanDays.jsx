/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";


export default function MealPlanDays() {
  return (
    <div>
      <div className="weekly-plan">
        <div id="monday">
          <div className="day-of-week">
            <p>Monday</p>
          </div>
          <div id="mealplan-task">
            <div className="mealplan-title">
              <h3>Avocado & Eggs</h3>
              <span><FontAwesomeIcon icon={faEllipsis} /></span>
            </div>
            <span id="mealplan-tag"></span>
            <img
                    src={
                        process.env.PUBLIC_URL +
                        "/Images/testphoto.png"
                    }
                    alt="Logo"
                    style={{width: "45%" }}
                    />            
                    <div className="mealplan-nutriscore-img">
              <div id="mealplan-nutriinfo">
                <span id="nutriscore"></span>
                <img src="#" id="profile-img" />
              </div>
            </div>
          </div>
        </div>
        <div id="tuesday">
          <div className="day-of-week">
            <p>Tuesday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="wednesday">
          <div className="day-of-week">
            <p>Wednesday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="thursday">
          <div className="day-of-week">
            <p>Thursday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="friday">
          <div className="day-of-week">
            <p>Friday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="saturday">
          <div className="day-of-week">
            <p>Saturday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="sunday">
          <div className="day-of-week">
            <p>Sunday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
      </div>
    </div>
  );
}
