import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/functions";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/performance";

firebase.initializeApp({
  /* Your project data here */
});

export default firebase;
export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();
export const performance = firebase.performance();
