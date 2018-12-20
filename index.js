const express = require('express');
const socket = require('socket.io');

//app setup

const app = express();
const server = app.listen(4000, () => {
    console.log('server listening on port 4000');
});

///static files

app.use(express.static('public'));


////socket setup 

let io = socket(server);

io.on('connection', function (socket) {
    console.log('socket connection is on' + socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});