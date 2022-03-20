// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5IkNmZNs5ip45gf82FH64DRMr-XeghsQ",
  authDomain: "alternativeauth-581d3.firebaseapp.com",
  projectId: "alternativeauth-581d3",
  storageBucket: "alternativeauth-581d3.appspot.com",
  messagingSenderId: "770759001769",
  appId: "1:770759001769:web:756cb3ef1a89fc5c434bb8"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    //not initiallised
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };