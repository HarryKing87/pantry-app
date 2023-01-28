import Navigation from "./Navigation";
import "./CSS/about.css";
export default function About() {
  return (
    <div>
      <Navigation />
      <div className="quote-about">
        <p>
          <i>
            "The revelation to store food may be as essential to our temporal
            salvation today as boarding the ark was to the people in the days of
            Noah.“
            <br />{" "}
            <b style={{ float: "right", margin: "1rem auto" }}>
              - Ezra Taft Benson
            </b>
          </i>
        </p>
      </div>
      <div id="image-about">
        <img
          src="https://cdn-icons-png.flaticon.com/512/706/706195.png"
          alt=""
        />
      </div>
      <div className="intro-about" style={{ width: "80%" }}>
        Over the last few decades, but especially during COVID-19, many of us
        are shopping less and buying more in bulk to last us longer. “There’s
        definitely been a decrease in the amount of time spent purchasing food,
        meal prepping/planning and cooking meals,” said Julie Simpson, a
        registered dietitian at Banner Health. “Our culture wants tasty meals in
        30 minutes or less. This in turn has led to more processed and
        pre-packaged foods in our pantry.” Pre-packaged or canned foods won’t go
        bad as fast, but they can easily get lost and forgotten and create chaos
        in the pantry. Besides, you only have so much space! It also means some
        fresh foods can go to waste as well. We’ve all had an unplanned science
        fair project in the back of our fridge. If you’re like most people,
        cleaning and organizing your pantry (and fridge) probably isn’t at the
        top of your to-do list right now. But there are many reasons to do so,
        including your health and your bank account.
      </div>
    </div>
  );
}
