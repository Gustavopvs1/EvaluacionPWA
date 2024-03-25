import React from "react";
import { signInWithGooglePopup } from "../firebase";
import CustomNavbar from "../components/CustomNavbar";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      console.log("logGoogleUser: ", response);
      navigate("/");

      //go to home
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
  );
}

export default Login;
