// @flow

import ccxt from 'ccxt';
import _ from 'lodash';
import store from '../system/Store'

import Market from './Market'
import Stall from './Stall'

/**
 * An Exchange is where coins are traded.
 *
 * An Exchange has a collection of Markets, each of which
 * enables trading (via a Stall) of a quote Coin to/from
 * a set of base Coins.
 */
export default class Exchange {

  constructor(world: World, name: string) {
    this.world = world;
    this.name = name;
    this.store = world.store;

    // Connect to the exchange
    this.ccxtExchange = new ccxt[name]();

    this.markets = {};

    // If auth info exists, use it
    let auth = this.store.getAuthFor(name);
    if (auth) {
      this.ccxtExchange.apiKey = auth.apiKey;
      this.ccxtExchange.secret = auth.secret;
    }

    // Load exchange info
    let _this = this;
    (async () => {
      let markets = {};

      // Get a sorted list of ccxt markets
      let ccxtMarkets = await _this.ccxtExchange.load_markets();
      ccxtMarkets = _.values(ccxtMarkets);
      ccxtMarkets = _.sortBy(ccxtMarkets, [function (o) {
        return o.base;
      }]);

      // Build a map of Exchange -> Markets -> Stalls
      _.forEach(ccxtMarkets, function(ccxtMarket) {
        let quote = ccxtMarket.quote;
        let mkt = markets[quote];
        if (!mkt) {
          mkt = new Market(_this, quote);
          markets[quote] = mkt;
        }
        mkt.addStall(new Stall(_this, ccxtMarket));
      });

      // Build a hierarchy of

      // Store the Markets away, and mark the Exchange as 'ready'
      _this.markets = markets;
    })();
  }

  __loadAuth() {

  }

  getMarkets() {
    return this.markets;
  }

  isReady() {
    return this.markets !== null;
  }
}

