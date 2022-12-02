import PropTypes from 'prop-types';

import {
  ImageGalleryListItem,
  ImageGalleryListItemImage,
} from './ImageGalleryItem.styled';
// import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ onClick, dataGalleryItem }) => {
  const onClickImg = e => {
    return onClick(e.currentTarget.dataset.image);
  };

  const { webURL, largeURL } = dataGalleryItem;

  return (
    <ImageGalleryListItem onClick={onClickImg} data-image={largeURL}>
      <ImageGalleryListItemImage src={webURL} alt="" />
    </ImageGalleryListItem>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};
