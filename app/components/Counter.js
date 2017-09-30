// @flow
import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import ccxt from 'ccxt';
import styles from './Counter.css';
import _ from 'lodash';

const ReactDataGrid = require('react-data-grid');

const exchange = new ccxt.poloniex();
exchange.apiKey = 'SFSI9N9Q-OQJZ3ZQB-AXU1NKRD-SABDMBV4';
exchange.secret = 'aeeba1fdc55b2a0890e9d174064aae7de4597d156ab161c6a54dfee20e3c3a92de2a1c3242472a5cf08127cdd427688cbcb433256f442dca41b50d1e87118842';
const exchangeMap = {};

const tabStyles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const listStyles = {
  item: {
    fontSize: 12,
    fontWeight: 100,
    width: 100,
    height: 30
  },
};

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class Market extends Component {
  constructor(props) {
    super(props);

    this.state = {
      market: props.market
    };
  }

  render() {
    var market = this.state.market;
    var info = market.info;

    return (
      <div>
        <div className={styles.marketBase}>{market.base}</div>
        <br/>
      </div>
    );
  }
}

class QuoteView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: props.quote,
      markets: props.markets
    };
  }

  render() {
    var quote = this.state.quote;
    var items = [];
    var markets = _.values(this.state.markets);
    markets = _.sortBy(markets, [function(o) { return o.base; }]);
    var i = 1;
    _.forEach(markets, function (market) {
      if (market.info !== undefined) {
        items.push(<ListItem key={i} value={i} style={listStyles.item}><Market key={market.key} market={market}/></ListItem>);
        i++;
      }
    });

    return (
      <div>
        {/*<h2 style={tabStyles.headline}>{quote}</h2>*/}
        <SelectableList defaultValue={1}>
          {items}
        </SelectableList>
      </div>
    );
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {markets: null};

    (async () => {
      if (this.state.markets === null) {
        this.state.markets = await exchange.load_markets();
        _.forOwn(this.state.markets, function (market, key) {
          market.key = key;
          var quote = market.quote;
          if (!_.has(exchangeMap, quote)) {
            exchangeMap[quote] = {};
          }
          exchangeMap[quote][market.base] = market;
        });
        this.forceUpdate();

        console.log("EXCHANGE:  ", exchange.id, " MARKETS: ", this.state.markets);
      }
    })();
  };

  render() {
    var quoteViews = [];
    if (this.state.markets !== null) {
      _.forOwn(exchangeMap, function (markets, quote) {
        quoteViews.push( <Tab key={quote} label={quote}><QuoteView quote={quote} markets={markets} /></Tab> )
      });
    }

    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x"/>
          </Link>
        </div>
        <div className={styles.markets}>
          <Tabs >
          {quoteViews}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Counter;
