const form = document.querySelector("#settingsForm");

// If logged in, check which of the user's data is saved, then autoinput relevant values.
var userLoggedIn;
auth.onAuthStateChanged(token => {
    if (token) {
        userLoggedIn = token;
        db.collection("users").doc(userLoggedIn.uid).get().then(snap => {
            if (snap.data().artist1) {
                form.artist1.value = snap.data().artist1;
            }
            if (snap.data().artist2) {
                form.artist2.value = snap.data().artist2;
            }
            if (snap.data().artist3) {
                form.artist3.value = snap.data().artist3;
            }
            if (snap.data().recommended1) {
                form.link1.value = snap.data().recommended1;
            }
            if (snap.data().recommended2) {
                form.link2.value = snap.data().recommended2;
            }
            if (snap.data().recommended3) {
                form.link3.value = snap.data().recommended3;
            }
        });
    }
});

form.addEventListener("submit", event => {
    event.preventDefault();

    if (userLoggedIn) {
        db.collection("users").doc(userLoggedIn.uid).update({
            artist1: form.artist1.value,
            artist2: form.artist2.value,
            artist3: form.artist3.value,
            recommended1: form.link1.value,
            recommended2: form.link2.value,
            recommended3: form.link3.value
        });
    }
    $("#success").html("Your settings have been saved!");
    form.reset();
});

const signOut = document.querySelector("#signOut");
signOut.addEventListener("click", event => {
    event.preventDefault();
    auth.signOut();
    console.log("User signed out.");
});
