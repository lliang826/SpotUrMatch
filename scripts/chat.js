const matches = document.getElementById("connectionsList");

var currentGroup;

// If logged in, gets the currently logged in user and sets it to a variable.
var userLoggedIn;
auth.onAuthStateChanged(token => {
    if (token) {
        userLoggedIn = token;
    }
    renderContacts();
});

function renderContacts() {
    console.log("loaded");

    db.collection("users").doc(userLoggedIn.uid).get().then(function(snap) {
        console.log(userLoggedIn.uid);
        for (var i = 0; i < snap.data().group.length; i++) {
            let contactAnchor = document.createElement('a');
            contactAnchor.href = "#";
            let contactDiv = document.createElement('div');
            contactDiv.id = snap.data().group[i];
            contactDiv.classList.add('userMatches');
            contactAnchor.append(contactDiv);
            matches.append(contactAnchor);

            userInfoPull(snap.data().group[i], snap.data().username);

            document.getElementById(contactDiv.id).onclick = event => {
                $("#messages").html("");
                console.log(contactDiv.id);
                currentGroup = contactDiv.id;
                renderChat(contactDiv.id, userLoggedIn.uid);
            };
        }
    })

    console.log("complete");
}


function userInfoPull(groupID, username) {
    db.collection('users').where('group', 'array-contains', groupID)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.data().username != username) {
                    var name = document.createElement('h3');
                    name.innerText = doc.data().username;
                    document.getElementById(groupID).append(name);
                }
            })
        })
}

function renderChat(groupID, username) {
    console.log(groupID);
    db.collection("groups").doc(groupID).collection("msgs").get().then(snap => {
        snap.forEach(doc => {
            console.log("here!");
            var msgHistory = document.createElement('li');
            msgHistory.innerText = doc.data().msg;
            console.log(username);
            console.log(doc.data().sender);
            if (doc.data().sender == username) {
                msgHistory.classList.add('yourMessages');
            } else {
                msgHistory.classList.add('theirMessages');
            }
            $("#messages").append(msgHistory);
        });
    });
};

$("#submit").on("click", event => {
    newMessage();
});

function newMessage() {
    message = document.getElementById("chatbox").value;

    const increment = firebase.firestore.FieldValue.increment(1);
    db.collection("groups").doc(currentGroup).update({
        msgNo: increment
    }).then(event => {
        db.collection("groups").doc(currentGroup).get().then(snap => {
            var messageNo = snap.data().msgNo;
            db.collection("groups").doc(currentGroup).collection("msgs").doc("" + messageNo).set({
                msg: message,
                sender: userLoggedIn.uid
            });
        });
    });

    var yourMsg = document.createElement('li')
    yourMsg.classList.add('yourMessages');
    yourMsg.innerText = message;
    $("#messages").append(yourMsg);

    document.getElementById("chatbox").value = "";
}

$("#chatbox").keypress(function(event) {

    var key = (event.keyCode || event.which);
    if (key == 13) {
        newMessage();
    }
});

const signOut = document.querySelector("#signOut");
signOut.addEventListener("click", event => {
    event.preventDefault();
    auth.signOut();
    console.log("User signed out.");
});
