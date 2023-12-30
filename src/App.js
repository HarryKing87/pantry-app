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
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Register from "./Profile/Register";
import Loader from "./Loader";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "./Database/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const db = getFirestore();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        getDocs(q)
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              setDoc(userRef, {
                id: user.uid,
                isUserPremium,
              });
            } else {
              const data = querySnapshot.docs[0].data();
              setIsUserPremium(data.isUserPremium);
            }
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
          });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Define the JSX for premium user routes
  const premiumRoutes = (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/fruits" element={<Fruits />} />
      <Route path="/vegetables" element={<Vegetables />} />
      <Route path="/dairy" element={<Dairy />} />
      <Route path="/pasta" element={<Pasta />} />
      <Route path="/meat" element={<Meat />} />
      <Route path="/misc" element={<Misc />} />
    </Routes>
  );

  // Define the JSX for non-premium user routes
  const nonPremiumRoutes = (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/fruits" element={<Dashboard />} />
      <Route path="/vegetables" element={<Dashboard />} />
      <Route path="/dairy" element={<Dashboard />} />
      <Route path="/pasta" element={<Dashboard />} />
      <Route path="/meat" element={<Dashboard />} />
      <Route path="/misc" element={<Dashboard />} />
    </Routes>
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        {/* Preventing logged-in users from accessing the login page. */}
        <Routes>
        {user !== null ? <Route element={<AuthWrapper />}><Route path="/login" element={<Profile />} /></Route> : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>

        <Routes>
          <Route element={<AuthWrapper />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>

        {isUserPremium ? premiumRoutes : nonPremiumRoutes}
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
