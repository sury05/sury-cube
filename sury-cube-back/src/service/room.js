import db from '../db';

// function getRooms() {
//   //return db.get('rooms').value();
//   return rooms;
// }
//
// function getRoom(userId) {
//   return rooms.filter(room => room.userId === userId);
//   //return db.get('rooms').find({ userId }).value();
// }
//
// function createRoom(room) {
//   addRoom(room);
//   //db.get('rooms').push(room).write();
// }
//
// function updateRoom(userId, updatedRoom) {
//   rooms.map((room) => {
//     if(room.userId === userId) {
//       return updatedRoom;
//     }
//     return room;
//   });
//   //
//   // db.get('rooms')
//   //   .find({userId})
//   //   .assign(room)
//   //   .write();
// }
//
// export {
//   // getRooms,
//   // getRoom,
//   // createRoom,
//   // updateRoom,
// };
