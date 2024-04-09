import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
import { getAuth, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Asegúrate de importar getFirestore

const firebaseConfig = {
  apiKey: "AIzaSyBNpMdPs4vbAYYm1E1kB6lgNHhOThjCU-k",
  authDomain: "pwa-pinterest-d75db.firebaseapp.com",
  projectId: "pwa-pinterest-d75db",
  storageBucket: "pwa-pinterest-d75db.appspot.com",
  messagingSenderId: "743352793339",
  appId: "1:743352793339:web:48609ce2a255adca4cd85e",
  measurementId: "G-SJQLX7EBP3"
};
// Inicializar la aplicación Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// Forzar al usuario a seleccionar una cuenta cuando interactúa con el proveedor
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const analytics = getAnalytics(app);

// Asegúrate de inicializar Firestore correctamente
export const firestore = getFirestore(app); // Asegúrate de inicializar Firestore correctamente
export const messaging = getMessaging(app);

export const updateUserDisplayNameInDatabase = async (userId, newDisplayName) => {
  try {
    await firestore.collection("users").doc(userId).update({
      displayName: newDisplayName,
    });
  } catch (error) {
    console.error("Error updating user display name in database:", error);
    throw error;
  }
};
