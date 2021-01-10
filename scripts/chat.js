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
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).get().then(function(doc) {
            var matches = doc.data().groups.length;
            for (var i = 0; i < matches; i++) {
                var newDiv = document.createElement('div');
                newDiv.addClass('userMatches');
                newDiv.id = doc.data().groups[i];
            }
        })
    })
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


var btn1 = document.getElementById("matchedUserBtn1");
var btn2 = document.getElementById("matchedUserBtn2");

btn1.onclick = function () {
    if (btn2.hasClass('active')) {
        btn2.removeClass('active');
        btn1.addClass('active');
        messagePull();
    } else {
        btn1.addClass('active');
    }
}

btn2.onclick = function () {
    if (btn1.hasClass('active')) {
        btn1.removeClass('active');
        btn2.addClass('active');
        messagePull();
    } else {
        btn2.addClass('active');
    }
}

function messagePull() {
    $(msgScreen).empty();

}
