import {giveCardToPlayers, makeCard} from '@/service/card';
import {playRooms} from '@/socket/handler';
import PlayRoom from '@/vo/PlayRoom';
import Player from '@/vo/Player';

describe('makeCard', () => {
  it('should make initial card 106', () => {
    const cards = makeCard();

    expect(cards.length).toEqual(106);
  });

  it('should make initial card with five colors', () => {
    const cards = makeCard();

    let red = cards.filter(card => card.getColor() === 'red');
    let yellow = cards.filter(card => card.getColor() === 'yellow');
    let blue = cards.filter(card => card.getColor() === 'blue');
    let black = cards.filter(card => card.getColor() === 'black');
    let white = cards.filter(card => card.getColor() === 'white');

    expect(red.length).toEqual(26);
    expect(yellow.length).toEqual(26);
    expect(blue.length).toEqual(26);
    expect(black.length).toEqual(26);
    expect(white.length).toEqual(2);
  });

  describe('', () => {
    const players = [new Player('id1', 'name1'), new Player('id2', 'name2')];
    playRooms.addRoom(new PlayRoom({
      id: 'roomId',
      name: '',
      maxNumber: 3,
      joinedNumber: 2,
      readyNumber: 0,
      cards: null,
      players: players,
      state: 'waiting',
    }));

    const separatedCard = giveCardToPlayers('roomId');

    expect(separatedCard['players']['name1'].length).toEqual(13);
    expect(separatedCard['players']['name2'].length).toEqual(13);
    expect(separatedCard['left'].length).toEqual(80);
    expect(separatedCard['opened'].length).toEqual(0);
  });
});

