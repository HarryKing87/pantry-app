import "../CSS/price-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const PriceCard = ({ title, price, features }) => {
  // Separate features into Free and Paid categories
  const freeFeatures = features.filter((feature) => feature.free);
  const paidFeatures = features.filter((feature) => feature.paid);

  return (
    <div className="price-card-container">
      {/* Free Features Card */}
      {freeFeatures.length > 0 && (
        <div className="price-card">
          <h3>Free Features</h3>
          <ul className="features">
            {freeFeatures.map((feature) => (
              <li key={feature.name} className="priceList">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ color: "#4caf50", paddingRight: "10px" }}
                  className="fontAwesome"
                />
                {feature.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Paid Features Card */}
      {paidFeatures.length > 0 && (
        <div className="price-card">
          <h3>Paid Features (${price}/month)</h3>
          <ul className="features">
            {paidFeatures.map((feature) => (
              <li key={feature.name} className="priceList">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ color: "#4caf50", paddingRight: "10px" }}
                  className="fontAwesome"
                />
                {feature.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PriceCard;
