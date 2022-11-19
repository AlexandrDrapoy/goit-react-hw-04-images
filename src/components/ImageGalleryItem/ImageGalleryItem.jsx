import { Component } from 'react';

export class ImageGalleryItem extends Component {
  onClickImg = e => {
    return this.props.onClick(e.currentTarget.dataset.image);
  };

  render() {
    const { webURL, largeURL } = this.props.dataGalleryItem;

    return (
      <li
        className="ImageGalleryItem"
        onClick={this.onClickImg}
        data-image={largeURL}
      >
        <img className="ImageGalleryItem-image" src={webURL} alt="" />
      </li>
    );
  }
}
