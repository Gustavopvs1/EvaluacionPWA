import React, { useState } from "react";
import { signInWithGooglePopup } from "../firebase";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      const user = response.user; // Access the logged-in user information

      // Prepare user data for Firestore (modify based on your needs)
      const firestoreUser = {
        uid: user.uid,
        email: user.email || "", // Handle cases where email might be absent
        displayName: user.displayName || "", // Handle cases where name might be absent
        photoURL: user.photoURL || "", // Save user's photo URL

        // Add other relevant user data fields (e.g., photoURL)
      };

      // Save user data in Firestore (assuming a "users" collection)
      const db = getFirestore();
      console.log("User:", user.uid);
      const usersRef = collection(db, "users"); // Adjust path based on your Firestore structure
      await setDoc(doc(usersRef, user.uid), firestoreUser); // Use user.uid as the document path
      console.log("User document written with ID:", user.uid);
      navigate("/");
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
