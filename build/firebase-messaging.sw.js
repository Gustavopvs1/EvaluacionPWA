importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js"
);

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBH2UdRWATVXpvk1ohUDEI0pgjnYfXD_I",
  authDomain: "test-push-cbd7c.firebaseapp.com",
  projectId: "test-push-cbd7c",
  storageBucket: "test-push-cbd7c.appspot.com",
  messagingSenderId: "624630754496",
  appId: "1:624630754496:web:caae6a83b542c786b99125",
  measurementId: "G-0CSWHXGH94",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

// Initialize Firebase// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: "./img/40.png",
  };

  self.registration.showNotification(notificationTitle, options);
});
