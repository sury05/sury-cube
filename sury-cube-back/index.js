import express from 'express';
import http from 'http';
import socket from 'socket.io';

import db from './src/db';
import routers from './src/routes';
import logger from 'morgan';
import {createRoom, getRoom, updateRoom} from "./src/service/room";
import {giveCardToPlayers} from "./src/service/card";

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

        const { state: originalState } = getRoom(id);

        const resultRoom = { ...room };
        if(originalState === 'waiting' && room.state === 'playing' ) {
            resultRoom.cards = giveCardToPlayers(id);
        }

        updateRoom(id, resultRoom);
        socket.broadcast.emit('room-updated', data);
    });
});

server.listen(3000, () => {
    console.log('Server Listening... ');
});
