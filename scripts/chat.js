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
                renderChat(contactDiv.id);
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

function renderChat(groupID) {
    console.log(groupID);
    db.collection("groups").doc(groupID).collection("msgs").get().then(snap => {
        snap.forEach(doc => {
            console.log("here!");
            $("#messages").append("<li>" + doc.data().msg + "</li>");
        });
    });
};

$("#submit").on("click", event => {
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

    $("#messages").append("<li>" + message + "</li>");
    document.getElementById("chatbox").value = "";
});

/*
msgBtn.onclick = function () {
    addMessage();
}

function clearText() {

}

window.onbeforeunload = messageClear;

function messageClear() {
    db.collection("msgs").doc("chatTest").update({
        messages: firebase.firestore.
    })
}




function messagePull() {
    $(msgScreen).empty();

}
*/
