import "./App.css";
import Home from "./Home";
import About from "./About";
import Dashboard from "./Dashboard";
import Feed from "./Feed";
import Login from "./Profile/Login";
import Profile from "./Profile/Profile";
import Fruits from "./Pantry/Fruits";
import Vegetables from "./Pantry/Vegetables";
import Dairy from "./Pantry/Dairy";
import Meat from "./Pantry/Meat";
import Pasta from "./Pantry/Pasta";
import Misc from "./Pantry/Misc";

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
        <Routes>
          <Route path="/pasta" element={<Pasta />} />
        </Routes>
        <Routes>
          <Route path="/misc" element={<Misc />} />
        </Routes>
        <Routes>
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
