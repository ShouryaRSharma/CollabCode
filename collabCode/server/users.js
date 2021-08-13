const users = [];

const addUser = ({id, name, room}) => {
    if (name) {
        name = name.trim()
        const user = { id, name, room }
        users.push(user)
        return { user };
    } else {
        return { error: "Enter a valid name" };
    }
}

const removeUser = (id) => {
    const userIdx = users.findIndex(user => user.id === id);
    if (userIdx !== -1) {
        return users.splice(userIdx, 1)[0];
    }
};

const findUser = (id) => {
    return users.find(user => user.id === id);
}

const currentRoom = (room) => {
    users.filter(user => user.room === room);
}

module.exports = { addUser, removeUser, findUser, currentRoom };