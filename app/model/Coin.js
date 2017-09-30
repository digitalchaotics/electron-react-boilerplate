// @flow

export default class Coin {
  id: string = null;

  constructor(id: string) {
    this.id = id;
  }

  static coins = {};

  static getCoin(id: string) {
    let result = Coin.coins[id];
    if (!result) {
      result = new Coin(id);
      Coin.coins[id] = result;
    }
    return result;
  }
}
