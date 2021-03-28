const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const express = require('express');

const fetchData = require('./fetchData');
const db = require('./db');

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

app.post('/reports', (req, res, next) => {
  db.addUser({ id: req.body.email });
  res.status(200).sendFile(path.join(__dirname + '/public/views/reports.html'));
});

app.post('/removeUser', (req, res, next) => {
  const success = db.removeUser({ id: req.body.id });
  if (success) res.status(200).send('Bortagen');
  else res.status(404).send('Fanns inte');
});

io.on('connection', (socket) => {
  socket.join(socket.id);
  console.log('connected: ', socket.id);

  io.emit('getPos');

  socket.on('pos', (data) => {
    fetchData.getReports(data.lat, data.lon, messageClient);
  });

  const messageClient = (data) => {
    io.to(socket.id).emit('message', {
      data: data,
    });
  };

  socket.on('connectUser', (user) => {
    user.socketId = socket.id;
    db.addUser(user);
  });

  socket.on('disconnect', () => {
    console.log('disconnected: ', socket.id);
  });
});

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server running on ${port}`));
