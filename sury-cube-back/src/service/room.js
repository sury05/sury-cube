import db from '../db';
import {getShuffledCard} from "./card";

function getRooms() {
  return db.get('rooms').value();
}

function getRoom(id) {
  return db.get('rooms').find({ id }).value();
}

function createRoom(room) {
  db.get('rooms').push({
    cards: {
      left: getShuffledCard()
    },
    ...room
  }).write();
}

function updateRoom(id, room) {
  db.get('rooms')
      .find({id})
      .assign(room)
      .write();
}

export {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
}
