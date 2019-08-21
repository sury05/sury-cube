import db from '../db';
import shortid from 'shortid';

function getRooms() {
  return db.get('room').value();
}

function getRoom(id) {
  return db.get('room').find({ id }).value();
}

function createRoom(room) {
  const id = shortid.generate();

  db.get('room').push({
    ...room,
    id,
  }).write();

  return id;
}

export {
  getRooms,
  getRoom,
  createRoom,
}
