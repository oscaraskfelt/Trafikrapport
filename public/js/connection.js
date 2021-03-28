$(document).ready(function () {
  const socket = io();

  socket.emit('connectUser', {
    id: sessionStorage.getItem('user'),
  });

  socket.on('message', (msg) => {
    const messages = msg.data.messages;
    let htmlString = '';
    if (messages.length > 0) {
      messages.forEach((report) => {
        htmlString += reportBuilder(report);
      });
    } else {
      htmlString = 'Inga rapporter att rapportera! ';
    }
    $('.loader').remove();
    $('#reports').empty();
    $('#reports').append(htmlString);
  });

  socket.on('getPos', () => {
    navigator.geolocation.getCurrentPosition((data) =>
      sendPosition(data, socket)
    );
  });
});

const sendPosition = (data, socket) => {
  const {
    coords: { latitude, longitude },
  } = data;
  socket.emit('pos', { lat: latitude, lon: longitude });
};

const reportBuilder = (report) => {
  return `
  <div class="report">
    <h3>${report.title}</h3>
    <p>Prio: ${report.priority}</p>
    <p>Plats: ${report.exactlocation}</p>
    <div>
      <p>Beskrivning:</p>
      <p>${report.description}</p>
    </div>
    <p>Kategori: ${report.subcategory}</p>
  </div>`;
};
