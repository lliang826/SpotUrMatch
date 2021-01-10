const matches = document.getElementById("connectionsList");

/* 

Create a function that reads the user's name from Firebase
let name="";
function foo() {
    
}*/

window.onload = function () {
    console.log("loaded");
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (snap) {
            for(var i = 0; i < snap.data().group.length; i++) {
                var newAnchor = document.createElement('a');
                newAnchor.href = "#";
                var newDiv = document.createElement('div');
                newDiv.id = snap.data().group[i];
                newDiv.classList.add('userMatches');
                newAnchor.append(newDiv);
                matches.append(newAnchor);
                userInfoPull(snap.data().group[i], snap.data().username);
            }
        })
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



function placeholder() {
    document.getElementById("chatbox").value = "";
}
/*
function addMessage() {
    message = document.getElementById("msg-input").value;

    db.collection("msgs").doc("chatTest").update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    });
    clearText();
}

msgBtn.onclick = function () {
    addMessage();
}

function clearText() {
    document.getElementById("msg-input").value = "";
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