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
  newUser.date = new Date();

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

const purgeUsers = () => {
  const users = readFromFile();

  const filteredUsers = users.filter(
    (user) => Math.abs(new Date(user.date) - new Date()) / 36e5 < 24
  );
  if (filteredUsers.length != users.length) {
    writeToFile(filteredUsers);
    return true;
  } else return false;
};

module.exports = { addUser, removeUser, purgeUsers };
