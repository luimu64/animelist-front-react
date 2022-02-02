import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "<replace me>",
    authDomain: "<replace me>",
    projectId: "<replace me>",
    storageBucket: "<replace me>",
    messagingSenderId: "<replace me>",
    appId: "<replace me>"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();