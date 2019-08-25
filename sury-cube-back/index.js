import express from 'express';
import http from 'http';
import socket from 'socket.io';

import db from './src/db';
import routers from './src/routes';
import logger from 'morgan';
import {createRoom, updateRoom} from "./src/service/room";

const app = express();
const server = http.createServer(app);
const io = socket(server);

db.defaults({
    rooms:[]
}).write();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', routers);


io.on('connection', socket => {
    socket.on('make-room', data => {
        createRoom(data);
        socket.broadcast.emit('room-made', data);
    });

    socket.on('update-room', data => {
        const { id, room } = data;
        updateRoom(id, room);
        socket.broadcast.emit('room-updated', data);
    });
});

server.listen(3000, () => {
    console.log('Server Listening... ');
});
