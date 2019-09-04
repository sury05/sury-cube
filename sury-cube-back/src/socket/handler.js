import Player from '../vo/Player';
import PlayRoom from '../vo/PlayRoom';
import PlayRooms from '../vo/PlayRooms';
import {giveCardToPlayers} from '../service/card';

export const playRooms = new PlayRooms();

export function socketOn(io) {
  io.on('connection', socket => {
    socket.on('make-room', data => {
      const { id, name, maxNumber, playerName } = data;
      const room = new PlayRoom({
        id,
        name,
        maxNumber,
        joinedNumber: 1,
        readyNumber: 0,
        cards: {},
        players: [new Player(socket.id, playerName)],
        state: 'waiting',
      });

      playRooms.addRoom(room);
      io.emit('room-made', room.toObject());
    });

    socket.on('join-room', data => {
      const { id, playerName } = data;

      const targetRoom = playRooms.getRoom(id);
      targetRoom.joinedNumber = targetRoom.joinedNumber + 1;
      targetRoom.players = [...targetRoom.players, new Player(socket.id, playerName)];

      playRooms.updateRoom(targetRoom);
      io.emit('room-updated', targetRoom.toObject());
    });

    socket.on('ready-room', data => {
      const { id, readyNumber } = data;

      const targetRoom = playRooms.getRoom(id);
      targetRoom.readyNumber = readyNumber;

      if(targetRoom.joinedNumber > 1 && targetRoom.joinedNumber === targetRoom.readyNumber) {
        targetRoom.cards = giveCardToPlayers(id);
        targetRoom.state = 'playing';
      }

      playRooms.updateRoom(new PlayRoom(targetRoom));

      if(targetRoom.state === 'playing') {
        targetRoom.players.forEach((player) => {
          const roomOfPlayer = { ...targetRoom };
          roomOfPlayer.cards = {
            players: {
              [player.name]: roomOfPlayer.cards.players[player.name].map(card => card.toObject()),
            }
          };
          io.to(player.userId).emit('game-start', roomOfPlayer);
        });
      }else {
        io.emit('room-updated', targetRoom.toObject());
      }
    });

    socket.on('update-room', data => {
      const { room } = data;
      const originalRoom = playRooms.getRoom(room.id);

      if(!originalRoom) return;

      const changedRoom = new PlayRoom(room) ;
      playRooms.updateRoom(changedRoom);
      io.emit('room-updated', data);
    });
  });
}

