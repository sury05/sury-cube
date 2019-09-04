import socket from './index';

function sendMakeRoom({
  id, name, maxNumber, playerName,
}) {
  socket.emit('make-room', {
    id, name, maxNumber, playerName,
  });
}

function sendJoinRoom({ id, playerName }) {
  socket.emit('join-room', { id, playerName });
}

function sendReadyRoom({ id, readyNumber }) {
  socket.emit('ready-room', { id, readyNumber });
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
  sendJoinRoom,
  sendReadyRoom,
};
