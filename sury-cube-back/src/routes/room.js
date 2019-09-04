import { Router } from 'express';
import {playRooms} from '../socket/handler';

const room = Router();

room.get('/', (req, res) => {
  res.status(200).json(playRooms.getRooms().map(room => room.toObject()));
});

room.get('/:roomId', (req, res) => {
  res.status(200).json(playRooms.getRoom(req.params.id).toObject());
});

room.post('/', (req, res) => {
  playRooms.addRoom(req.body.room);
  res.status(200);
});

export default room;
