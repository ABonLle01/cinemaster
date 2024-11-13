var users = require("./users.json");

function getAllUserCredentials() {
    return users.map(user => ({
        username: user.username,
        password: user.password
    }));
}

function checkUserCredentials(username, password) {
    const credentials = getAllUserCredentials();
    const user = credentials.find(user => user.username === username && user.password === password);
    return user ? true : false;
}

module.exports = {
    getAllUserCredentials, checkUserCredentials
};