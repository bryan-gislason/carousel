import React, { Component } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import Carousel from "./components/carousel";

class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      images: []
    };
  }

  private fetchSeattleImageSourcesFromFlickr() {
    return fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
        process.env.REACT_APP_FLICKR_API_KEY
      }&safe_search=1&content_type=1&place_id=uiZgkRVTVrMaF2cP&media=photos&format=json&nojsoncallback=true`,
      {
        method: "GET"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json.photos.photo.reduce(
          (imageSources: string[], { farm, server, id, secret }: any) => {
            return [
              ...imageSources,
              `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
            ];
          },
          []
        );
      });
  }

  componentDidMount() {
    this.fetchSeattleImageSourcesFromFlickr().then((imageSources: string[]) => {
      this.setState((state: any) => {
        return {
          ...state,
          images: imageSources
        };
      });
    });
  }
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <Carousel imageSources={this.state.images} />
        </header>
      </div>
    );
  }
}

export default App;
