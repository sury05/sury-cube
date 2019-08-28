export default class PlayRoom {
  constructor(id, name, maxNumber, joinedNumber, readyNumber, cards, players) {
    this.id = id;
    this.name = name;
    this.maxNumber = maxNumber;
    this.joinedNumber = joinedNumber;
    this.readyNumber = readyNumber;
    this.cards = cards;
    this.players = players;
  }
}
