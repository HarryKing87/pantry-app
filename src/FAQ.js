import React, { useState } from "react";
import "./CSS/faq.css";

function FAQ() {
  // initialize state for the answers
  const [answers, setAnswers] = useState({
    answer1: false,
    answer2: false,
    answer3: false,
  });

  // function to toggle the answer
  const toggleAnswer = (id) => {
    setAnswers((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Lobster', cursive" }}>FAQ</h1>
      {/* question 1 */}
      <div className="question" onClick={() => toggleAnswer("answer1")}>
        What kitchen organization strategies can I implement using this web
        application?
      </div>
      {answers.answer1 && (
        <div className="answer">
          <p>
            Our web application provides a variety of kitchen organization
            strategies, including tips for decluttering, maximizing storage
            space, and creating designated zones for different types of items.
            Additionally, we offer customizable organizational tools that allow
            you to create a personalized system that fits your unique needs and
            preferences.
          </p>
        </div>
      )}
      {/* question 2 */}
      <div className="question" onClick={() => toggleAnswer("answer2")}>
        How can this web application help me keep track of my pantry inventory
        and expiration dates?
      </div>
      {answers.answer2 && (
        <div className="answer">
          <p>
            With our web application, you can easily track your pantry inventory
            and expiration dates using our built-in inventory management system.
            Simply input the items you have in your pantry and their expiration
            dates, and our system will automatically remind you when items are
            about to expire so you can use them before they go bad.
          </p>
        </div>
      )}
      {/* question 3 */}
      <div className="question" onClick={() => toggleAnswer("answer3")}>
        Are there any features in this web application that can assist me in
        meal planning and grocery shopping?
      </div>
      {answers.answer3 && (
        <div className="answer">
          <p>
            Yes, our web application includes several features to help with meal
            planning and grocery shopping. You can create meal plans for the
            week and generate a shopping list based on the ingredients you need.
            You can also save your favorite recipes in our recipe book for easy
            access and use our meal prep planner to plan and prepare meals in
            advance.
          </p>
        </div>
      )}
    </div>
  );
}

export default FAQ;
