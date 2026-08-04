// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBZ1BV2sEbkdX6b9lg3TWn4Sm-tYF4DUl4",
    authDomain: "sudoku-4357b.firebaseapp.com",
    projectId: "sudoku-4357b",
    storageBucket: "sudoku-4357b.firebasestorage.app",
    messagingSenderId: "254873947538",
    appId: "1:254873947538:web:f7f390754cfe4765d4454b",
    measurementId: "G-Z5YWZFSMFF"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);