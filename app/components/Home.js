// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>AltDesk</h2>
          <Link to="/counter">Poloniex &raquo;</Link>
          <br/>
          <Link to="/exchange">Exchange &raquo;</Link>
        </div>
      </div>
    );
  }
}
