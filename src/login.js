export default function Login() {
  let showLogin = document.querySelector(".loginPage");
  let showRegister = document.querySelector(".registerPage");

  function showLoginPage() {
    showLogin.style.display = "block";
    showRegister.style.display = "none";
  }
  function showRegisterPage() {
    showLogin.style.display = "none";
  }
  return (
    <div>
      {/* The login page */}
      <div className="loginPage">
        <h3>The login page</h3>
        <form
          action=""
          style={{
            display: "flex",
            "flex-direction": "column",
            "max-width": "50%",
            margin: "1rem auto",
          }}
        >
          <label>Username</label>
          <input type="text" />
          <label>Password</label>
          <input type="password" />
        </form>
        <button type="submit">Submit</button>
      </div>

      {/* The registration page */}
      <div className="registerPage" style={{ display: "none" }}>
        <h3>The register page</h3>
        <form
          action=""
          style={{
            display: "flex",
            "flex-direction": "column",
            "max-width": "50%",
            margin: "1rem auto",
          }}
        >
          <label>Username</label>
          <input type="text" />
          <label>Password</label>
          <input type="password" />
        </form>
        <button type="submit">Submit</button>
      </div>
      <div>
        <h2>
          <a href="#" className="registerButton" onClick={showRegisterPage}>
            Register
          </a>
        </h2>
        <h2>
          <a href="#" className="loginButton" onClick={showLoginPage}>
            Login
          </a>
        </h2>
      </div>
    </div>
  );
}
