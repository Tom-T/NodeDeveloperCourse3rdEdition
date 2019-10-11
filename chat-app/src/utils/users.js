const users = [];
//adduser, removeUser, getUSer, getUsersInRoom

const addUser = ({ id, username, room }) => {
  //Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //Validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required."
    };
  }
  //Check for existing user
  const existingUser = users.find(user => {
    return user.room === room && user.username === username;
  });
  //Validate username
  if (existingUser) {
    return {
      error: "Username is in use."
    };
  }

  //Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => {
  const index = users.findIndex(user => user.id === id);
  return index !== -1 ? users[index] : undefined;
};

const getUsersInRoom = room => {
  let usersInRoom = [];
  users.forEach(user => {
    if (room.trim().toLowerCase() === user.room) {
      usersInRoom.push(user.username);
    }
  });

  return usersInRoom
};


// // Tests
// addUser({ id: 1, username: "User1", room: "Room1" });
// addUser({ id: 2, username: "User2", room: "Room1" });
// addUser({ id: 3, username: "User3", room: "Room2" });
// console.log(users);
// console.log(getUser(3));
// console.log(getUser(34));
// console.log(getUsersInRoom("room2"));
// console.log(getUsersInRoom("Room1"));
