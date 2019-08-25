import socket from './index';

function sendMakeRoom(room) {
  socket.emit('make-room', room);
}

function sendUpdateRoom(id, room) {
  socket.emit('update-room', {
    id,
    room,
  });
}

export {
  sendMakeRoom,
  sendUpdateRoom,
};
