// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1MciiyaYuf_wmUWQ-HNRwptFyEsnsftM",
  authDomain: "post-app-aa4bb.firebaseapp.com",
  projectId: "post-app-aa4bb",
  storageBucket: "post-app-aa4bb.appspot.com",
  messagingSenderId: "371802356609",
  appId: "1:371802356609:web:c4be978cbfe0ac074b4680",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
