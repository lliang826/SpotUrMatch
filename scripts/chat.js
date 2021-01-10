const msgScreen = document.getElementById("messages")
const msgForm = document.getElementById("messageForm");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");

//var usermessages = db.collection("msgs").doc();
// db.collection('resources').doc(resourceType).update({
//    visitCount: firebase.firestore.FieldValue.increment(1)


/* Create a function that reads the user's name from Firebase
let name="";
function foo() {
    
}*/

window.onload = function () {
    console.log("loaded");
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).get().then(function(doc) {
            var groups = doc.data().group;
            console.log(groups);
            for (var i = 0; i < groups.length; i++) {
                var newDiv = document.createElement('div');
                newDiv.addClass('userMatches');
                newDiv.id = doc.data().group[i];
            }
        })
    })
    console.log("complete");
}



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

/*window.onbeforeunload = messageClear;

function messageClear() {
    db.collection("msgs").doc("chatTest").update({
        messages: firebase.firestore.
    })
}*/




function messagePull() {
    $(msgScreen).empty();

}
