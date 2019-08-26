import Vue from 'vue';
import Vuex from 'vuex';

import { sendMakeRoom, sendUpdateRoom } from './socket/send-message';

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
    updateRoom(state, { id, room }) {
      state.rooms = state.rooms.map((r) => {
        if (r.id === id) {
          return room;
        }
        return r;
      });
    },
  },
  actions: {
    addRoomAndSendMessage({ commit }, room) {
      commit('addRoom', room);
      sendMakeRoom(room);
    },
    joinRoomAndSendMessage({ state, commit }, { id, playerName }) {
      const updatedRoom = { ...state.rooms.filter(room => room.id === id)[0] };
      updatedRoom.players = [playerName, ...updatedRoom.players];
      updatedRoom.joinedNumber += 1;

      commit('updateRoom', { id, room: updatedRoom });
      sendUpdateRoom(id, updatedRoom);
    },
    readyAndSendMessage({ state, commit }, { id, readyNumber, state: roomState }) {
      const updatedRoom = { ...state.rooms.filter(room => room.id === id)[0] };
      updatedRoom.readyNumber = readyNumber;
      updatedRoom.state = roomState;

      commit('updateRoom', { id, room: updatedRoom });
      sendUpdateRoom(id, updatedRoom);
    },
  },
});
