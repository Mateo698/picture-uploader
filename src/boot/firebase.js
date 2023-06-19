/* eslint-disable */

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

// Agregar configuración firebase:
var firebaseConfig = {
    apiKey: "AIzaSyAl1CZKLEag5HsWIaXmN6Y9H0ehz4XjBiA",
    authDomain: "picture-uploader-260cf.firebaseapp.com",
    projectId: "picture-uploader-260cf",
    storageBucket: "picture-uploader-260cf.appspot.com",
    messagingSenderId: "261950010707",
    appId: "1:261950010707:web:0e630240ec3219ea4f5da6"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();

export { db, firebase, auth, storage };