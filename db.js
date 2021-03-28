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
  let exists = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == newUser.id) {
      //update oldUser with newUser
      users[i] = newUser;
      writeToFile(users);
      exists = true;
    }
  }
  if (!exists) registerUser(users, newUser);
};

const registerUser = (users, user) => {
  user.date = new Date();
  users.push(user);
  writeToFile(users);
};

const removeUser = (oldUser) => {
  const users = readFromFile();
  const filteredUsers = users.filter((user) => user.id != oldUser.id);
  if (filteredUsers.length != users.length) {
    writeToFile(filteredUsers);
    return true;
  } else return false;
};

module.exports = { addUser, removeUser };
