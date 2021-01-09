// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAHsEmD3d4Y-DKWFt-oTvDDoekcWbqw3zM",
    authDomain: "spoturvibe.firebaseapp.com",
    projectId: "spoturvibe",
    storageBucket: "spoturvibe.appspot.com",
    messagingSenderId: "744959749382",
    appId: "1:744959749382:web:f3b374858225340f518287"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create the Firestore database object and Firebase Auth object.
// Henceforce, any reference to the database can be made with "db",
// any reference to auth can be made with "auth"
const auth = firebase.auth();
const db = firebase.firestore();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
