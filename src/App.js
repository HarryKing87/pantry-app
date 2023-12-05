import "./App.css";
import { useState, useEffect } from "react";
import Home from "./Home";
import About from "./About";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Profile/Login";
import Profile from "./Profile/Profile";
import Fruits from "./Pantry/Fruits";
import Vegetables from "./Pantry/Vegetables";
import Dairy from "./Pantry/Dairy";
import Meat from "./Pantry/Meat";
import Pasta from "./Pantry/Pasta";
import Misc from "./Pantry/Misc";
import Register from "./Profile/Register";
import Loader from "./Loader";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "./Database/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Preventing the user from accessing the profile and dashboard page while not logged
  function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
      return unsub;
    }, []);

    return { currentUser };
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5-second delay

    return () => clearTimeout(timerId);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const AuthWrapper = () => {
    const location = useLocation();
    const { currentUser } = useAuth();

    if (currentUser === undefined) return null;

    return currentUser ? (
      <Outlet />
    ) : (
      <Navigate to="/" replace state={{ from: location }} />
    );
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
          <Route element={<AuthWrapper />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Routes>
        <Route  element={<AuthWrapper />}>
          <Route path="/login" element={<Profile />} />
        </Route>
          <Route element={<AuthWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AuthWrapper />}>
            <Route path="/fruits" element={<Dashboard />} />
          </Route>
          <Route element={<AuthWrapper />}>
            <Route path="/vegetables" element={<Dashboard />} />
          </Route>
          <Route element={<AuthWrapper />}>
            <Route path="/dairy" element={<Dashboard />} />
          </Route>
          <Route element={<AuthWrapper />}>
            <Route path="/meat" element={<Dashboard />} />
          </Route>
          <Route element={<AuthWrapper />}>
            <Route path="/pasta" element={<Dashboard />} />
          </Route>
          <Route element={<AuthWrapper />}>
            <Route path="/misc" element={<Dashboard />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
