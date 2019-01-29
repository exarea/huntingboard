import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCpuQ5pdfU167fCJN2PNaL-EUM4nfSPX20",
    authDomain: "cooldown-8643b.firebaseapp.com",
    databaseURL: "https://cooldown-8643b.firebaseio.com",
    projectId: "cooldown-8643b",
    storageBucket: "",
    messagingSenderId: "443166393881"
};
firebase.initializeApp(config);
console.log("start your engines!");

export default firebase
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();