// The index of the current user. This keeps track of which user is currently being displayed on the page.
var i = 0;

const uidList = [];
const usernameList = [];
const artist1List = [];
const artist2List = [];
const artist3List = [];
const recommended1List = [];

// If logged in, gets the currently logged in user and sets it to a variable.
var userLoggedIn;
var userSearch;

auth.onAuthStateChanged(token => {
    if (token) {
        userLoggedIn = token;
    }

    var userInfo = db.collection("users").doc(userLoggedIn.uid);

    userInfo.get().then(function(doc) {
        if (doc.exists) {
            console.log("data:", doc.data().lastSearch);
            userSearch = doc.data().lastSearch;
            // Sends each document in the "users" collection where the queries match to render().
            db.collection("users").where("artist1", "==", userSearch).get().then(snap => {
                snap.forEach(doc => {
                    queueUser(doc);
                });
                checkIfButtonDisable();
                updateUser();
            });
            db.collection("users").where("artist2", "==", userSearch).get().then(snap => {
                snap.forEach(doc => {
                    queueUser(doc);
                });
                checkIfButtonDisable();
                updateUser();
            });
            db.collection("users").where("artist3", "==", userSearch).get().then(snap => {
                snap.forEach(doc => {
                    queueUser(doc);
                });
                checkIfButtonDisable();
                updateUser();
            });
        }
    });
});

function queueUser(doc) {
    uidList.push(doc.id);
    usernameList.push(doc.data().username);
    artist1List.push(doc.data().artist1);

    if (doc.get("artist2") != null) {
        artist2List.push(doc.data().artist2);
    } else {
        artist2List.push(null);
    }

    if (doc.get("artist3") != null) {
        artist3List.push(doc.data().artist3);
    } else {
        artist3List.push(null);
    }

    if (doc.get("recommended1") != null) {
        var userRecommended1 = doc.data().recommended1;

        for (stringLength = 0; stringLength < userRecommended1.length - 2; stringLength++) {

            if (userRecommended1.charAt(stringLength) == "c" &&
                userRecommended1.charAt(stringLength + 1) == "o" &&
                userRecommended1.charAt(stringLength + 2) == "m") {

                var newEmbed = userRecommended1.substring(0, stringLength + 4) + "embed/" + userRecommended1.substring(stringLength + 4);

                recommended1List.push(newEmbed);
            }
        }
    } else {
        recommended1List.push(null);
    }
}

function updateUser() {
    $("#username").html(usernameList[i]);
    $("#artist1").html(artist1List[i]);
    $("#artist2").html(artist2List[i]);
    $("#artist3").html(artist3List[i]);

    if (recommended1List[i] != null) {
        $("#no-recommended").html("This user recommends:");
        document.getElementById("spotify-replacement").src = recommended1List[i];
    } else {
        $("#no-recommended").html("This user has no recommendations.");
        document.getElementById("spotify-replacement").src = "";
    }
}

// "Next" button handler.
$("#buttonRight").on("click", event => {
    i++;
    checkIfButtonDisable();
    updateUser();
});

// "Previous" button handler.
$("#buttonLeft").on("click", event => {
    i--;
    checkIfButtonDisable();
    updateUser();
});

// Disables the "next" or "previous" button if a user doesn't exist in that direction.
function checkIfButtonDisable() {
    if (i > 0) {
        document.getElementById("buttonLeft").disabled = false;
    } else {
        document.getElementById("buttonLeft").disabled = true;
    }
    if (i != usernameList.length - 1) {
        document.getElementById("buttonRight").disabled = false;
    } else {
        document.getElementById("buttonRight").disabled = true;
    }
}

// "Message" button handler. Adds the currently shown user to the user's messaging system.
$("#addMessage").on("click", event => {
    db.collection("groups").add({
        user1: userLoggedIn.uid,
        user2: uidList[i]
    }).then(doc => {
        db.collection("users").doc(userLoggedIn.uid).update({
            group: firebase.firestore.FieldValue.arrayUnion(doc.id)
        });
        db.collection("users").doc(uidList[i]).update({
            group: firebase.firestore.FieldValue.arrayUnion(doc.id)
        });
        db.collection("groups").doc(doc.id).collection("msgs").set({});
    });
});
