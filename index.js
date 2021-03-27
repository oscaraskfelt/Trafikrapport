const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname + '/views/index.html'));
});

io.on('connection', (socket) => {
  console.log('connected');

  io.emit('message', {
    data: 'example data',
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server running on ${port}`));
