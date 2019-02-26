import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Carousel from './components/carousel'


class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      images: [
        'https://c1.staticflickr.com/6/5558/14816728310_fae96af284_b.jpg',
        'https://c1.staticflickr.com/8/7281/8737514820_17c9e41d0f_h.jpg',
        'https://c1.staticflickr.com/5/4826/44752608200_7111f63741_b.jpg',
      ]
    };
  }
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <Carousel imageSources={this.state.images}/>
        </header>
      </div>
    );
  }
}

export default App;
