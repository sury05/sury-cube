import Card from '../vo/Card';
import {getRoom} from './room';

const AMOUNT_OF_EACH_COLOR_CARD = 13;

export function getShuffledCard() {
  return shuffle(makeCard());
}

export function giveCardToPlayers(id) {
  const { players } = getRoom(id);

  const cards = getShuffledCard();

  const resultCard = {};

  players.forEach(name => {
    const givenCards = [];

    for(let i=0; i<13; i++) {
      givenCards.push(cards.pop());
    }

    resultCard[name] = givenCards;
  });

  resultCard.initial = cards;

  return resultCard;
}

export function shuffle(a) {
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

