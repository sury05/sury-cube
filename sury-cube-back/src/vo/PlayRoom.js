import Player from './Player';

export default class PlayRoom {
  constructor({ id, name, maxNumber, joinedNumber, readyNumber, cards, players, state }) {
    this.id = id;
    this.name = name;
    this.maxNumber = maxNumber;
    this.joinedNumber = joinedNumber;
    this.readyNumber = readyNumber;
    this.cards = cards;
    this.players = players.map(player => new Player(player.userId, player.name));
    this.state = state;
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      maxNumber: this.maxNumber,
      joinedNumber: this.joinedNumber,
      readyNumber: this.readyNumber,
      cards: this.cards,
      players: this.players.map(player => player.toObject()),
      state: this.state,
    };
  }
}
