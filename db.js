const fs = require('fs');

const writeToFile = (data) => {
  let JSONdata = JSON.stringify(data);
  fs.writeFileSync('users.json', JSONdata);
};

const readFromFile = () => {
  let users;
  try {
    const data = fs.readFileSync('users.json');
    users = JSON.parse(data);
  } catch (error) {
    users = [];
    writeToFile(users);
  } finally {
    return users;
  }
};

const addUser = (newUser) => {
  const users = readFromFile();
  if (users.some((user) => user.id == newUser.id)) {
    //Add socket.id to user
  } else {
    registerUser(users, newUser);
  }
};

const registerUser = (users, user) => {
  user.date = new Date();
  users.push(user);
  writeToFile(users);
};

const removeUser = (users, oldUser) => {
  const filteredUsers = users.filter((user) => user.id != oldUser.id);
  if (filteredUsers.length != users.length) writeToFile(filteredUsers);
};

module.exports = { addUser, removeUser };
