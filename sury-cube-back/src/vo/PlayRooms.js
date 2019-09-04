import PlayRoom from './PlayRoom';
import logger from 'morgan';

export default class PlayRooms {

  constructor() {
    this.rooms = [];
  }

  getRooms() {
    return this.rooms;
  }

  getRoom(id) {
    return this.rooms.filter(room => room.id === id)[0];
  }

  addRoom(room) {
    if(!(room instanceof PlayRoom)) {
      throw new Error('room is not a instance of PlayRoom');
    }
    this.rooms.push(room);
    //logger.info(`rooms: ${this.rooms.toString()}`);
  }

  updateRoom(updatedRoom) {
    if(!(updatedRoom instanceof PlayRoom)) {
      throw new Error('updatedRoom is not a instance of PlayRoom');
    }
    this.rooms = this.rooms.map((room) => {
      if(room.id === updatedRoom.id) {
        return updatedRoom;
      }
      return room;
    });

    //logger.info(`updatedRoom: ${updatedRoom.toString()}`);
  }

  clearRoom() {
    this.rooms = [];
  }
}
