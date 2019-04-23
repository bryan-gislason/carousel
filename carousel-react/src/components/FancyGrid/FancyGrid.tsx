import React from "react";
import styles from "./FancyGrid.module.css";

interface FancyGridState {
  columnPhotos: string[][],
}
interface FancyGridProps {
  imageSources: string[];
}

class FancyGrid extends React.Component <FancyGridProps, FancyGridState> {
  public constructor(props: any) {
    super(props);
  }
  private getColumnPhotos() {
    if (!this.props.imageSources.length) return;
    let columnPhotos: string[][] = [[], [], []];
    this.props.imageSources.forEach((imageSource: string, idx: number) => {
      const colIndex = idx % columnPhotos.length;
      columnPhotos[colIndex].push(imageSource);
    });
    return columnPhotos;
  }
  public render() {
    const columnPhotos = this.getColumnPhotos();
    const images = columnPhotos ? columnPhotos.map((column) => {
      return column.map((imageUrl) => {
        return (<img src={imageUrl} className={styles.img}/>);
      });
    }) : null;
    return images ? (
      <div className={styles.root}>
        <div className={styles.column}>{images[0]}</div>
        <div className={styles.column}>{images[1]}</div>
        <div className={styles.column}>{images[2]}</div>
      </div>) : null
  }
}

export default FancyGrid;
