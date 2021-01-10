
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

msgBtn.onclick = function() {
    message = document.getElementById("msg-input").value;
    let data = {
        messages: [message]
    };
    db.collection("msgs").doc("chatTest").set(data);
    clearText();
}

function clearText() {
    document.getElementById("msg-input").placeholder = "";
}
