// Gets the logged in user and sets it to a variable.
var userLoggedIn;

auth.onAuthStateChanged(token => {
    if (token) {
        userLoggedIn = token;
        console.log(userLoggedIn.uid);
    } else {
        console.log("Nobody is signed in.");
    }
});

// Gets the user's search string.
$("#searchClick").on("click", event => {
    db.collection("users").doc(userLoggedIn.uid).update({
        lastSearch: document.getElementById("artistField").value
    }).then(event => {
        location.href = "matching.html";
    });
});

// Uses the user's fav artist1.
$("#useClick").on("click", event => {
    db.collection("users").doc(userLoggedIn.uid).get().then(function (doc) {
        db.collection("users").doc(userLoggedIn.uid).update({
            lastSearch: doc.data().artist1
        }).then(event => {
            location.href = "matching.html";
        });
    });
});