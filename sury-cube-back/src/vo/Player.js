export default class Player {
  constructor(userId, name) {
    this.userId = userId;
    this.name = name;
  }

  getUserId() {
    return this.userId;
  }

  getName() {
    return this.name;
  }

  toObject() {
    return {
      userId: this.userId,
      name: this.name,
    };
  }

  fromObject(player) {
    const { userId, name } = player;
    return new Player(userId, name);
  }
}
