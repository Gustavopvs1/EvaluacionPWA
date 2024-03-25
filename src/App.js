import React from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";

import "./App.css";
import Login from "./pages/Login";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/perfil", element: <Perfil /> },
    { path: "/login", element: <Login /> },
    { path: "/", element: <Home /> },
  ]);
  return routes;
};
const App = () => (
  <div className="App">
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </div>
);
export default App;
