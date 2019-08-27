import {createRoom, getRoom, updateRoom} from '../service/room';
import {giveCardToPlayers} from '../service/card';

export function socketOn(io) {
  io.on('connection', socket => {
    console.log(socket.id);
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
}
