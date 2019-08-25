import socket from './index';
import store from '../store';

export default function init() {
  socket.on('room-made', (data) => {
    store.commit('addRoom', data);
  });

  socket.on('room-updated', (data) => {
    store.commit('updateRoom', data);
  });
}
