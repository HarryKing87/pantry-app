import "./App.css";
import { useState, useEffect } from "react";
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
import Register from "./Profile/Register";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {auth} from './Database/firebase';
import { onAuthStateChanged } from "firebase/auth";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  // Preventing the user from accessing the profile and dashboard page while not logged
  function useAuth() {
    const [currentUser, setCurrentUser] = useState();
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
      return unsub;
    }, []);
  
    return { currentUser };
  }

  const AuthWrapper = () => {
    const location = useLocation();
    const { currentUser } = useAuth();
  
    if (currentUser === undefined) return null;
  
    return currentUser 
      ? <Outlet />
      : <Navigate to="/" replace state={{ from: location }} />;
  };
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
        <Route element={<AuthWrapper />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        </Routes>
        <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
          </Route>
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
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
