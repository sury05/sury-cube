import { Router } from 'express';
import {playRooms} from '../socket/handler';

const room = Router();

room.get('/', (req, res) => {
  const rooms = playRooms.getRooms().map(({ ...rest }) => ({ cards: {}, ...rest }));
  res.status(200).json(rooms);
});

//TODO roomId, userName valid check
room.get('/:roomId/:userName', (req, res) => {
  const { roomId, userName } = req.params;

  const targetRoom = playRooms.getRoom(roomId).toObject();
  const playersCard = targetRoom.cards.players;

  targetRoom.cards = playersCard ? playersCard[userName] : {};

  res.status(200).json(targetRoom);
});

room.post('/', (req, res) => {
  playRooms.addRoom(req.body.room);
  res.status(200);
});

export default room;
