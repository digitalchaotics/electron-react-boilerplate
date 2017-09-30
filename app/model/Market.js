// @flow

import _ from 'lodash'
import Exchange from './Exchange'
import Stall from './Stall'
import Coin from './Coin'

/**
 * A Market is where a given 'quote' coin is traded for other coins.
 * A Market has a collection of Stalls - one for each tradeable coin.
 */
export default class Market {

  exchange : Exchange = null;
  quoteCoin : Coin = null;
  stalls = {};

  constructor(exchange, quote) {
    this.exchange = exchange;
    this.quoteCoin = Coin.getCoin(quote);
  }

  addStall(stall: Stall) {
    stall.market = this;

    this.stalls[stall.baseCoin.id] = stall;
  }

  getStalls() {
    return this.stalls;
  }

  getStallIds() {
    return _.keys(this.stalls);
  }

  getStall(baseCoinId: string) {
    return this.stalls[baseCoinId];
  }
}
