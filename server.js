const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 8080 || procces.env.PORT;

io.on("connection", socket => {
    socket.emit("message", "Welcome to Chad!");

    socket.broadcast.emit("message","A user has joined Chad !");
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the Chad");
    });
    socket.on("chatMessage",(msg)=> {
        io.emit("message",msg);
    });
});
app.use(express.static(path.join(__dirname,"public")));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
