// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7knliAUujTXE-FDa3yEIGI2tk42H3CiI",
  authDomain: "passanger-test.firebaseapp.com",
  projectId: "passanger-test",
  storageBucket: "passanger-test.appspot.com",
  messagingSenderId: "1078704444290",
  appId: "1:1078704444290:web:33496226e13a23ba8db59b",
  measurementId: "G-VF5DKJ43E3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(getAuth(app), email, password);
};

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
};
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = (handleNav) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const email = result.user.email;
      sessionStorage.setItem("email", email);
      handleNav();
    })
    .catch((error) => {
      console.log(error);
    });
};
