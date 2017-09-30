// @flow

import ccxt from 'ccxt'
import Exchange from './Exchange'
import Market from './Market'
import Coin from './Coin'

export default class Stall {
  exchange: Exchange = null;
  market: Market = null;
  ccxtMarket = null;
  baseCoin: Coin = null;
  quoteCoin: Coin = null;

  constructor(exchange, ccxtMarket) {
    this.exchange = exchange;
    this.ccxtMarket = ccxtMarket;
    this.baseCoin = Coin.getCoin(ccxtMarket.base);
    this.quoteCoin = Coin.getCoin(ccxtMarket.quote);
  }
}

