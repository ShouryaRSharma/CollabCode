const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = 5000;
const { addUser, removeUser, findUser, currentRoom } = require("./users");

app.use(cors())

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

            const joined = user.name + " has joined"
            socket.broadcast.to(user.room).emit("notification", {
                text: joined,
                type: 'connect'
            })

            io.to(user.room).emit("roomData", {
                room: user.room,
                users: currentRoom(user.room)
            })

            callback();
        }
    });
})