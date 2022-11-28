import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

// import PropTypes from 'prop-types';

import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ requestData, largeImageURL }) => {
  const onClickSelectedImg = imgUrl => {
    largeImageURL(imgUrl);
  };

  return (
    <>
      <ImageGalleryList>
        {/* largeImageURL={onClickSelectedImg} */}
        {requestData.map(imgElem => (
          <ImageGalleryItem
            key={imgElem.id}
            onClick={onClickSelectedImg}
            dataGalleryItem={imgElem}
          />
        ))}
      </ImageGalleryList>
    </>
  );
};
// <ImageGallery
//   toggle={toggleModal}
//   requestData={requestData}
//   largeImageURL={onClickImg}
// />;

// ImageGallery.propTypes = {
//   key: PropTypes.any.isRequired,
//   onClick: PropTypes.func.isRequired,
//   dataGalleryItem: PropTypes.shape({
//     id: PropTypes.any.isRequired,
//     webURL: PropTypes.string.isRequired,
//     largeURL: PropTypes.string.isRequired,
//   }),
//   onClose: PropTypes.func.isRequired,
// };
