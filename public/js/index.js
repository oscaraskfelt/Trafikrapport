$(document).ready(function () {
  const socket = io();

  socket.on('message', (msg) => {
    console.log(msg);
  });

  socket.on('getPos', () => {
    navigator.geolocation.getCurrentPosition((data) =>
      sendPosition(data, socket)
    );
  });

  $('#registerForm').on('submit', (e) => {
    e.preventDefault();
    const id = $('#registerEmail').val();
    socket.emit('connectUser', { id: id });
  });
});

const sendPosition = (data, socket) => {
  const {
    coords: { latitude, longitude },
  } = data;
  console.log(latitude, longitude);
  socket.emit('pos', { lat: latitude, lon: longitude });
};
