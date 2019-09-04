export default class Card {
  constructor(id, color, number) {
    this.id = id;
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
      id: this.id,
      color: this.color,
      number: this.number,
    };
  }
}
