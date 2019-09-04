import Card from '../vo/Card';
import { playRooms } from '../socket/handler';

const AMOUNT_OF_EACH_COLOR_CARD = 13;

export function giveCardToPlayers(id) {
  const { players } = playRooms.getRoom(id);
  const cards = getShuffledCard();
  const resultCard = {};
  const playerCard = {};
  players.forEach(player => {
    const givenCards = Array(AMOUNT_OF_EACH_COLOR_CARD).fill({}).map(() => cards.pop());
    playerCard[player.getUserId()] = givenCards;
  });

  resultCard.players = playerCard;
  resultCard.left = cards;
  resultCard.opened = [];
  return resultCard;
}

function getShuffledCard() {
  return shuffle(makeCard());
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function makeCard() {
  return [
    ...Array(AMOUNT_OF_EACH_COLOR_CARD).fill('red').map((color, index) => new Card(color, index+1)),
    ...Array(AMOUNT_OF_EACH_COLOR_CARD).fill('red').map((color, index) => new Card(color, index+1)),
    ...Array(AMOUNT_OF_EACH_COLOR_CARD).fill('yellow').map((color, index) => new Card(color, index+1)),
    ...Array(AMOUNT_OF_EACH_COLOR_CARD).fill('yellow').map((color, index) => new Card(color, index+1)),
    ...Array(AMOUNT_OF_EACH_COLOR_CARD).fill('blue').map((color, index) => new Card(color, index+1)),
    ...Array(AMOUNT_OF_EACH_COLOR_CARD).fill('blue').map((color, index) => new Card(color, index+1)),
    ...Array(AMOUNT_OF_EACH_COLOR_CARD).fill('black').map((color, index) => new Card(color, index+1)),
    ...Array(AMOUNT_OF_EACH_COLOR_CARD).fill('black').map((color, index) => new Card(color, index+1)),
    new Card('white', 0),
    new Card('white', 0),
  ];
}

