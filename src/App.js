import React, { useState, useEffect } from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import "./App.css";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import CustomNavbar from "./components/CustomNavbar";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/perfil", element: <Perfil /> },
    { path: "/login", element: <Login /> },
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
  ]);
  return routes;
};

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
      if (user) {
        setUserPhotoURL(user.photoURL);
      } else {
        setUserPhotoURL(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar
          isUserLoggedIn={isUserLoggedIn}
          userPhotoURL={userPhotoURL}
        />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
