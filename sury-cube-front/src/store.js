import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
  },
  mutations: {
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    addRoom(state, room) {
      state.rooms.push(room);
    },
    updateRoom(state, room) {
      state.rooms = state.rooms.map((r) => {
        if (r.id === room.id) {
          return room;
        }
        return r;
      });
    },
  },
});
