import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCRLX6o3TTsN-UWgi5jbj2pgh048g-KCD0",
    authDomain: "animelist-backend.firebaseapp.com",
    projectId: "animelist-backend",
    storageBucket: "animelist-backend.appspot.com",
    messagingSenderId: "976505659325",
    appId: "1:976505659325:web:cc5b33bb3679c946e23cd4"
};

export const app = initializeApp(firebaseConfig);