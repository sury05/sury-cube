import socket from '../socket';

export const mixin = {
  data() {
    return {
      id: socket.id,
    };
  },
};
