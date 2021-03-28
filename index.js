const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const express = require('express');

const fetchData = require('./fetchData');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname + '/public/views/index.html'));
});

io.on('connection', (socket) => {
  console.log('connected');

  io.emit('getPos');

  const messageClient = (data) => {
    io.emit('message', {
      data: data,
      ok: 'ok',
    });
  };

  socket.on('pos', (data) => {
    fetchData.getReports(data.lat, data.lon, messageClient);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server running on ${port}`));
