import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyADO9zEtlQ64YBwDHa4USkO7UXPwG6crqc",
    authDomain: "image-community-ae1be.firebaseapp.com",
    projectId: "image-community-ae1be",
    storageBucket: "image-community-ae1be.appspot.com",
    messagingSenderId: "802060387956",
    appId: "1:802060387956:web:197fade7c9c317d6f27321",
    measurementId: "G-NE7418Q1XH"
};

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage};