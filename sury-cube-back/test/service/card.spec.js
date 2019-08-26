import { makeCard } from '../../src/service/card';
import Card from "../../src/vo/card";

describe('makeCard', () => {
  it('should ', () => {
    const cards = makeCard();
    expect(cards[0]).toStrictEqual(new Card('red', 1));
    expect(cards.length).toEqual(106);
  });
});

