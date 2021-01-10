// The index of the current user. This keeps track of which user is currently being displayed on the page.
var i = 0;

const usernameList = [];
const artist1List = [];
const artist2List = [];
const artist3List = [];
const recommended1List = [];

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

    if (doc.get("recommended1") != null) {
      var userRecommended1 = doc.data().recommended1;

      for (stringLength = 0; stringLength < userRecommended1.length - 2; stringLength++) {
        
        if (userRecommended1.charAt(stringLength) == "c"
        && userRecommended1.charAt(stringLength + 1) == "o"
        && userRecommended1.charAt(stringLength + 2) == "m") {
          
          var newEmbed = userRecommended1.substring(0, stringLength + 4) + "embed/" + userRecommended1.substring(stringLength + 4);

          recommended1List.push(newEmbed);
          console.log("Array reccomended: " + recommended1List[i]);
        } else {
          recommended1List.push(null);
        }
      }
    }
}

function updateUser() {
    $("#username").html(usernameList[i]);
    $("#artist1").html(artist1List[i]);
    $("#artist2").html(artist2List[i]);
    $("#artist3").html(artist3List[i]);
    //document.getElementById("spotify-replacement").src = recommended1List[i];
    console.log(recommended1List[i]);
}

// Sends each document in the "users" collection where the queries match to render().
db.collection("users").where("artist1", "==", "smash mouth").get().then(snap => {
    snap.forEach(doc => {
        queueUser(doc);
    });
    checkIfButtonDisable();
    updateUser();
});

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
