const msgScreen = document.getElementById("messages")
const msgForm = document.getElementById("messageForm");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");

const db = firebase.database();
const msgRef = db.ref("/msgs");

var usermessages = db.collection("msgs").doc();
// db.collection('resources').doc(resourceType).update({
//    visitCount: firebase.firestore.FieldValue.increment(1)


/* Create a function that reads the user's name from Firebase
let name="";
function foo() {
    
}*/

msgForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
    e.preventDefault();
    const text = msgInput.value;

    if (!text.trim()) return alert('Please type a message'); //no msg submitted
    const msg = {
        name: name,
        text: text
    };

    msgRef.push(msg);
    msgInput.value = "";
}