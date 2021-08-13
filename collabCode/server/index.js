const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
    origin: "http://localhost:3000",
    }}
);
const cors = require("cors");
const PORT = 5000;
const { addUser, removeUser, findUser, currentRoom } = require("./users");

app.use(cors)

app.get("/", (request, response) => {
    response.send("<h1>Server initiated... </h1>");
})

io.on("connection", socket => {
    socket.on("join", ({name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room})

        if (error) {
            return callback(error)
        } else {
            socket.join(user.room)
            console.log("user id", socket.id)
            console.log(user.name)

            const joined = user.name + " has joined"
            socket.broadcast.to(user.room).emit("notification", {
                text: joined,
                type: 'connect'
            })

            io.to(user.room).emit("roomData", {
                room: user.room,
                users: currentRoom(user.room)
            })

            console.log(user.room)
            console.log(currentRoom(user.room))

            callback();
        }
    });

    socket.on("sendText", (text) => {
        const user = findUser(socket.id);
        console.log(text);
        socket.broadcast.to(user.room).emit("text", text);
    });

    socket.on("disconnect", () => {
        console.log("User has disconnected");
        const user = removeUser(socket.id);
        if (user) {
          io.to(user.room).emit("notification", {
            text: `${user.name} has left`,
            type: "disconnect",
          });
    
          io.to(user.room).emit("roomData", {
            room: user.room,
            users: currentRoom(user.room),
          });
        }
    });
})

http.listen(PORT, '127.0.0.1',  () => {
    console.log(`Listening on port ${PORT}`);
});