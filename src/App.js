import React, { useState, useEffect, useContext } from "react";
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom"; // Import Navigate for conditional redirection
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import "./App.css";
import EditarPerfil from "./pages/EditarPerfil"; // Agregamos la importación de la página EditarPerfil
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import CustomNavbar from "./components/CustomNavbar";
import { UserProvider, UserContext } from "./customHooks/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes = ({ isUserLoggedIn }) => {
  return useRoutes([
    { path: "/perfil", element: <Perfil /> }, // Redirect to login if not logged in
    {
      path: "/login",
      element: isUserLoggedIn ? <Navigate to="/" /> : <Login />,
    }, // Redirect to home if already logged in
    { path: "/editarperfil", element: <EditarPerfil /> }, // Agregamos la ruta para la página EditarPerfil
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
  ]);
};

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsUserLoggedIn(currentUser ? true : false);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <ToastContainer />
          <CustomNavbar isUserLoggedIn={isUserLoggedIn} />
          <AppRoutes isUserLoggedIn={isUserLoggedIn} />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
