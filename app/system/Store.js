// @flow

import store from 'store'

export default class Store {
  constructor() {
    this.cache = {};
    this.__pull();
  }

  get(id: string) {
    return this.cache[id];
  }

  put(id: string, value: any) {
    let was = get(id);
    this.cache[id] = value;
    this.__push();
    return was;
  }

  addExchange(exchange: Exchange) {
    let info = {
      id
    };
  }

  getExchangeInfoFor(name:string) {
    return this.cache.exchanges[name];
  }

  getAuthFor(name: string) {
    let result = null;
    let xchgInfo = this.getExchangeInfoFor(name);
    if (xchgInfo) {
      result = this.cache.auths[xchgInfo.id];
    }
    return result;
  }

  __pull() {
    this.cache = {
      exchanges: {
        poloniex: {
          id: 0,
          name: 'Poloniex',
        }
      },
      auths: [
        {
          apiKey: 'SFSI9N9Q-OQJZ3ZQB-AXU1NKRD-SABDMBV4',
          secret: 'aeeba1fdc55b2a0890e9d174064aae7de4597d156ab161c6a54dfee20e3c3a92de2a1c3242472a5cf08127cdd427688cbcb433256f442dca41b50d1e87118842'
        },
      ]
    };
    this.__push();
  }

  __push() {
    store.set('altdesk', this.cache);
  }
}
