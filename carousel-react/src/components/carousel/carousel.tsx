import React from "react";
import styles from "./carousel.module.css";
import { LeftArrow, RightArrow } from "../ui-core/icon";

interface CarouselProps {}
class Carousel extends React.Component<CarouselProps, {}> {
  constructor(props: CarouselProps) {
    super(props);
  }
  render() {
    return (
      <div className={styles.carousel}>
        <div className={styles.body}>
          <button className={`${styles.button} ${styles.buttonLeft}`}>
            <LeftArrow />
          </button>
          <img
            className={styles.image}
            src="https://c1.staticflickr.com/6/5558/14816728310_fae96af284_b.jpg"
          />
          <button className={`${styles.button} ${styles.buttonRight}`}>
            <RightArrow />
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
