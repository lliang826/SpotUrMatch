// The index of the current user. This keeps track of which user is currently being displayed on the page.
var i = 0;

const usernameList = [];
const artist1List = [];
const artist2List = [];
const artist3List = [];

function queueUser(doc) {

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

}

function updateUser() {
    $("#username").html(usernameList[i]);
    $("#artist1").html(artist1List[i]);
    $("#artist2").html(artist2List[i]);
    $("#artist3").html(artist3List[i]);
}

// Sends each document in the "users" collection where the queries match to render().
db.collection("users").where("artist1", "==", "smash mouth").get().then(snap => {
    snap.forEach(doc => {
        queueUser(doc);
    });
    checkIfButtonDisable();
    updateUser();
});

<<<<<<< HEAD
var userRecommended = user.recommended1;

db.collection("users").where("recommended1", "==", userRecommended).get().then(function)
=======
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
>>>>>>> 8777e19bd6f28383d7156016a0c634d9b375bfc8
