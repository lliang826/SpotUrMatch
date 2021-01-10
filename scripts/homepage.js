// Gets the logged in user and sets it to a variable.
var userLoggedIn;

auth.onAuthStateChanged(token => {
    if (token) {
        userLoggedIn = token;
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