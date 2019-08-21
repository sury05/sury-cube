import { Router } from 'express';
import {createRoom, getRoom, getRooms} from '../service/room';

const room = Router();

room.get('/', (req, res) => {
  res.status(200).json(getRooms());
});

room.get('/:id', (req, res) => {
  res.status(200).json(getRoom(req.params.id));
});

room.post('/', (req, res) => {
  const id = createRoom(req.body.room);
  res.status(200).send(id);
});

export default room;
