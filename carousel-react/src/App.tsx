import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Carousel from './components/carousel'

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <Carousel />
        </header>
      </div>
    );
  }
}

export default App;
