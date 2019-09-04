import store from '../store';

export function saveUserName(playerName) {
  sessionStorage.setItem('playerName', playerName);
  store.commit('setPlayerName', playerName);
}

export function getUserName() {
  return sessionStorage.getItem('playerName');
}
