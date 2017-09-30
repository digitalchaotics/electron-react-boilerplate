// @flow

import _ from 'lodash';

import Exchange from './Exchange'
import Store from '../system/Store'

/**
 * The World is the root model object.
 *
 * It holds references to all supported Exchanges.
 */
export default class World {

  constructor() {
    this.store = new Store();
    this.exchanges = {};

    let _this = this;
    let names = this.exchangeNames();
    let exchanges = {};
    _.forEach(names, function(name: string) {
      exchanges[name] = new Exchange(_this, name);
    });

    this.exchanges = exchanges;
  }

  exchangeNames() {
    let xchgs = this.store.get('exchanges');
    return _.keys(xchgs);
  }

  getExchange(name: string): Exchange {
    return this.exchanges[name];
  }
}

