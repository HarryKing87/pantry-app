import Navigation from "./Navigation";
import "./CSS/about.css";

export default function About() {
  return (
    <div>
      <Navigation />
      <div class="container">
        <div class="image">
          <img
            src="https://images.unsplash.com/photo-1590311825124-73ec5233cb0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            alt=""
            width={"70%"}
            style={{ borderRadius: "20px" }}
          />
        </div>
        <div class="text">
          <h1>Welcome to Pantry.</h1>
          <p>The ultimate destination for all your recipe needs!</p>
          <p>
            We understand that cooking can be challenging, especially when it
            comes to finding recipes that cater to your dietary restrictions and
            food allergies. That's why we created Pantry, a user-friendly web
            application that offers a wide variety of delicious and healthy
            recipes for every taste bud.
          </p>
          <p>
            At Pantry, we're passionate about cooking and believe that good food
            should never compromise on taste or nutrition. That's why we have
            carefully curated a vast collection of recipes that cater to
            different dietary preferences, including vegan, gluten-free, keto,
            and more. With Pantry, you'll have access to thousands of
            mouth-watering recipes, from quick and easy weeknight meals to
            elaborate gourmet dishes that are perfect for special occasions.
          </p>
          <p>
            One of the unique features of Pantry is our allergy and ingredient
            filter. With just a few clicks, you can save your allergies and
            dietary restrictions and get recipe recommendations that fit your
            needs. Whether you're allergic to peanuts, lactose intolerant, or
            following a low-carb diet, Pantry has got you covered. Our
            ingredient and recipe information also provides you with a detailed
            breakdown of nutritional information, so you can make informed
            choices about what you eat.
          </p>
          <p>
            At Pantry, we're committed to making your cooking experience as
            hassle-free as possible. Our user-friendly interface and intuitive
            design make it easy to search for recipes, save your favorite
            dishes, and create meal plans for the week ahead. With our
            convenient shopping list feature, you can also generate a shopping
            list based on the ingredients you need for your selected recipes,
            making grocery shopping a breeze.
          </p>
          <p>
            We hope that Pantry becomes your go-to source for all your recipe
            needs. Join our community of passionate cooks, and discover new
            recipes that will delight your taste buds and keep you healthy and
            happy.
          </p>
        </div>
      </div>
    </div>
  );
}
