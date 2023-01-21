import "./App.css";
import Home from "./Home";
import About from "./About";
import Dashboard from "./Dashboard";
import Login from "./Profile/Login";
import Profile from "./Profile/Profile";
import Fruits from "./Pantry/Fruits";
import Vegetables from "./Pantry/Vegetables";
import Dairy from "./Pantry/Dairy";
import Meat from "./Pantry/Meat";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Routes>
          <Route path="/fruits" element={<Fruits />} />
        </Routes>
        <Routes>
          <Route path="/vegetables" element={<Vegetables />} />
        </Routes>
        <Routes>
          <Route path="/dairy" element={<Dairy />} />
        </Routes>
        <Routes>
          <Route path="/meat" element={<Meat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
