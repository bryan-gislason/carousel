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

  componentDidMount() {
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d78588f066e433afc3fcabdf887c0ea7&safe_search=1&content_type=1&place_id=uiZgkRVTVrMaF2cP&media=photos&format=json&nojsoncallback=true",
      {
        method: "GET"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        const imageSources = json.photos.photo.reduce(
          (imageSources: string[], { farm, server, id, secret }: any) => {
            return [
              ...imageSources,
              `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
            ];
          },
          []
        );

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
