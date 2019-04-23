import React, { Component } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import Carousel from "./components/carousel";
import FancyGrid from "./components/FancyGrid";
import { resolve } from "url";

const loadImage = (imageUrl: string) => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = function() {
      resolve(imageUrl);
    }
  });
}

const loadImages = (imageUrls: string[]) => {
  return Promise.all(imageUrls.map(loadImage));
}

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
        console.log(json);
        return json.photos && json.photos.photo.reduce(
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
    this.fetchSeattleImageSourcesFromFlickr().then(async (imageSources: string[]) => {
      const loadedImageSources = await loadImages(imageSources.slice(0, 10));
      this.setState((state: any) => {
        return {
          ...state,
          images: loadedImageSources
        };
      });
    });
  }

  render() {
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <h1>Seattle, WA</h1>
        </header>
        <div className={styles.AppContent}>
          <FancyGrid imageSources={this.state.images} />
        </div>
      </div>
    );
  }
}

export default App;
