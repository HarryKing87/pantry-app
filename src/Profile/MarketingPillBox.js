import { useState } from "react";
import "../CSS/marketing-pillbox.css";
import "../CSS/subscription-comparison.css";
import { Dialog } from "primereact/dialog";
import SubscriptionComparison from "./SubscriptionComparison";

// Verified badge
const verified = (
    <i
      className="pi pi-verified"
      style={{ fontSize: "1rem", color: "#fff", paddingRight: '5px' }}
      title="Premium User"
    ></i>
  );

export default function MarketingPillBox() {
    const [visibleMarketingPillBox, setvisibleMarketingPillBox] = useState(false);
    
    const marketingVisibility = () => {
        setvisibleMarketingPillBox(true);
      };
    return (
        <div id="marketing-pillbox">
<div id="marketing-label">
{verified}
<span onClick={marketingVisibility}><b><i>Subscribe</i></b></span>
</div>
<div id="marketing-price">
$2 / mo
</div>
<Dialog
        header="Pantry Premium"
        visible={visibleMarketingPillBox}
        style={{ width: "90%", margin: '0 auto' }}
        onHide={() => setvisibleMarketingPillBox(false)}
        className="marketing-benefits"
      >
        <SubscriptionComparison/>
      </Dialog>
        </div>
    );
}