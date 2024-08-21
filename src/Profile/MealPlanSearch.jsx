/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faNotesMedical, faEnvelopeOpenText,faShareNodes, faNoteSticky, faCompass, faChartSimple, faBolt, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AutoComplete } from 'primereact/autocomplete';

export default function MealPlanSearch() {
    return(
        <div>
            <div className='mealplan-search'>
              <div className='mealplan-search-input'>
                <span className="p-float-label">
                  <AutoComplete inputId="ac" id="search"/>
                  <label htmlFor="ac"><FontAwesomeIcon icon={faMagnifyingGlass} /> Search Meals</label>
                </span>
              </div>
              <div className='mealplan-utilities'>
                <button id="labels"><FontAwesomeIcon icon={faBolt} id="util-icon"/>Labels</button>
                <button id="addNotes"><FontAwesomeIcon icon={faNoteSticky} id='util-icon'/>Add Note</button>
                <button id="share"><FontAwesomeIcon icon={faShareNodes} id="util-icon"/>Share</button>
              </div>
            </div>
        </div>
    );
}