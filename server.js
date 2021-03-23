const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {userJoin, getCurrentUser,userLeave,getRoomUsers} = require("./utils/users");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "Admin";

const PORT = 8080 || procces.env.PORT;

io.on("connection", socket => {
    socket.on("joinRoom", ({username, room})=>{
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit("message", formatMessage(botName, "Welcome to Chad !"));

        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} has joined the chat`));
    })
    
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit("message", formatMessage(botName, `${user.username} has disconnected`)); 
        }
    });
    socket.on("chatMessage",(msg)=> {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message",formatMessage(user.username,msg));
    });
});
app.use(express.static(path.join(__dirname,"public")));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
