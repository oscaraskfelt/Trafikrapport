$(document).ready(function () {
  const socket = io();

  socket.on('message', (msg) => {
    const messages = msg.data.messages;
    console.log(messages);
    let htmlString = '';
    if (messages.length > 0) {
      messages.forEach((report) => {
        htmlString += reportBuilder(report);
      });
    } else {
      htmlString = 'Inga rapporter att rapportera! ';
    }
    $('#reports').empty();
    $('#reports').append(htmlString);
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

const reportBuilder = (report) => {
  return `
  <hr/>
  <div>
    <p>titel: ${report.title}</p>
    <p>prio: ${report.priority}</p>
    <p>plats: ${report.exactlocation}</p>
    <p>beskrivning: ${report.description}</p>
    <p>kategori: ${report.subcategory}</p>
  </div>`;
};
