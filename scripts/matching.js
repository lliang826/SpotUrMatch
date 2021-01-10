const usernames = [];

function render(doc) {
    usernames.push(doc.data().username);
    $("#username").append(doc.data().username);
}

// Sends each document in the "users" collection where the queries match to render().
db.collection("users").where("artist1", "==", "smash mouth").get().then(snap => {
  snap.forEach(doc => {
    render(doc);
  });
});

var userRecommended = user.recommended1;

db.collection("users").where("recommended1", "==", userRecommended).get().then(function)