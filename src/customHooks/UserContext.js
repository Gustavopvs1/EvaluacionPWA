import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsUserLoggedIn(currentUser ? true : false);
      console.log("UserProvider: User logged in:", currentUser);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
