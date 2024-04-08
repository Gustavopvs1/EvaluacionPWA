import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  useRoutes,
  BrowserRouter,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import CustomNavbar from "./components/CustomNavbar";
import { UserProvider } from "./customHooks/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "@fontsource/roboto/400.css"; // Import only the necessary font weights
import "@fontsource/roboto/500.css";

const Home = lazy(() => import("./pages/Home"));
const Perfil = lazy(() => import("./pages/Perfi"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EditarPerfil = lazy(() => import("./pages/EditarPerfil"));
const CategoryView = lazy(() => import("./pages/CategoryView"));

const AppRoutes = React.memo(({ isUserLoggedIn }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return useRoutes([
    {
      path: "/profile",
      element: isUserLoggedIn ? <Perfil /> : <Login />,
    },
    {
      path: "/editProfile",
      element: <EditarPerfil />,
    },
    {
      path: "/library",
      element: isUserLoggedIn && category ? (
        <CategoryView categorySelected={category} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/login",
      element: isUserLoggedIn ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
});

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsUserLoggedIn(currentUser ? true : false);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <ToastContainer />
          <CustomNavbar isUserLoggedIn={isUserLoggedIn} />
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes isUserLoggedIn={isUserLoggedIn} />
          </Suspense>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;