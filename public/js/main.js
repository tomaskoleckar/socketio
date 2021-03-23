const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const leaveButton = document.getElementById("leave-btn");
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});


leaveButton.addEventListener("click", function(){
    window.location = '../index.html';
});

console.log(username, room);
const socket = io();

socket.emit("joinRoom", {username, room});


outputRoomName(room);

if(room == "Admin-room"){
    let userPassword = prompt("Please enter a password", "password");
    if(userPassword != "admin"){
        window.location = '../index.html';
    }
}

socket.on("message", message => {
    console.log(message);
    outputMessage(message);

chatMessages.scrollTop = chatMessages.scrollHeight;
});



chatForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    socket.emit("chatMessage", msg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});



function outputMessage(message){
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class = "text">
        ${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

function outputRoomName(room) {
    roomName.innerText = room;
  }
  function outputUsers(users) {
    userList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }
