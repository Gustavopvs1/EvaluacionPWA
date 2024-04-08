import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup } from "../firebase";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import googleIcon from "../assets/logos/google.png";
import "./Login.css"; 

const Login = () => {
  const navigate = useNavigate();

  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      const user = response.user;

      const firestoreUser = {
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        // Add other relevant user data fields
      };

      const db = getFirestore();
      const usersRef = collection(db, "users");
      await setDoc(doc(usersRef, user.uid), firestoreUser);

      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      // Add user-friendly error handling here if needed
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="text-center text-white fw-bold mb-5">Login</h2>
        <Button
          onClick={logGoogleUser}
          className="rounded-5 bg-white p-3 fw-bold fs-5 text-black"
        >
          <img
            src={googleIcon}
            alt="Google icon"
            width={50}
            height={50}
            className="me-4"
          />
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
