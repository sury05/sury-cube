export default class Card {
  constructor(color, number) {
    this.color = color;
    this.number = number;
  }

  getColor() {
    return this.color;
  }

  getNumber() {
    return this.number;
  }

  toObject() {
    return {
      color: this.color,
      number: this.number,
    };
  }
}
