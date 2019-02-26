import React from "react";
import styles from "./carousel.module.css";
import { LeftArrow, RightArrow } from "../ui-core/icon";

interface CarouselState {
  readonly currentImageIndex: number;
}

interface CarouselProps {
  imageSources: string[];
}
class Carousel extends React.Component<CarouselProps, CarouselState> {
  constructor(props: CarouselProps) {
    super(props);

    this.state = {
      currentImageIndex: 0
    };

    this.onRightClick = this.onRightClick.bind(this);
    this.onLeftClick = this.onLeftClick.bind(this);
  }

  private onRightClick() {
    this.setState((state, props) => {
      return {
        ...state,
        currentImageIndex:
          (state.currentImageIndex + 1) % props.imageSources.length
      };
    });
  }

  private onLeftClick() {
    this.setState((state, props) => {
      const isNeg = state.currentImageIndex - 1 < 0;
      return {
        ...state,
        currentImageIndex: isNeg
          ? props.imageSources.length - 1
          : state.currentImageIndex - 1
      };
    });
  }

  public render() {
    const { imageSources } = this.props;
    const imageSource = imageSources[this.state.currentImageIndex];
    return (
      <div className={styles.carousel}>
        <div className={styles.body}>
          <button
            className={`${styles.button} ${styles.buttonLeft}`}
            onClick={this.onLeftClick}
          >
            <LeftArrow />
          </button>
          <img className={styles.image} src={imageSource} />
          <button
            className={`${styles.button} ${styles.buttonRight}`}
            onClick={this.onRightClick}
          >
            <RightArrow />
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
