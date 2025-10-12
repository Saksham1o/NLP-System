import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0moD_84jGNs090Y4N6HnUA3PXV3BQ3NA",
  authDomain: "nlp-d-c9784.firebaseapp.com",
  projectId: "nlp-d-c9784",
  storageBucket: "nlp-d-c9784.firebasestorage.app",
  messagingSenderId: "1076330002056",
  appId: "1:1076330002056:web:afcb019178a9c2ec0e913d",
  measurementId: "G-75SKM2BZ0E",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
