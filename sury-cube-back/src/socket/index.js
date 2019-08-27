import socket from 'socket.io';

export default (server) => {
  return socket(server);
};
