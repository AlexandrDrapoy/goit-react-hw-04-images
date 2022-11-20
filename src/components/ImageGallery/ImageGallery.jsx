import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import Notiflix from 'notiflix';
import {
  ImageGalleryList,
  SelectedModalWindowImage,
} from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
axios.defaults.baseURL = 'https://pixabay.com/api';

export class ImageGallery extends Component {
  state = {
    requestData: [],
    page: null,
    loading: true,
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onClickImg = largeURL => {
    this.toggleModal();
    this.setState({ largeModalImgURL: largeURL });
  };

  loadMore = () => {
    this.setState({ loading: true });
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  normalizeResponse = response => {
    const nornalizeData = response.data.hits.map(
      ({ webformatURL, id, largeImageURL }) => ({
        id: id,
        webURL: webformatURL,
        largeURL: largeImageURL,
      })
    );

    return nornalizeData;
  };
  componentDidMount() {
    this.setState({ page: 1 });
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchValue = prevProps.searchValue;
    const nextSearchValue = this.props.searchValue;
    if (prevSearchValue !== nextSearchValue || nextSearchValue === '') {
      this.setState({
        requestData: [],
        page: 1,
        loading: true,
        showModal: false,
      });
    }
    if (
      prevSearchValue !== nextSearchValue ||
      prevState.page !== this.state.page
    ) {
      try {
        const response = await axios.get('/', {
          params: {
            q: nextSearchValue,
            key: '31452049-9028b927189bb89bc78a16cd7',
            page: this.state.page,
            per_page: 12,
          },
        });
        if (!response.data.totalHits) {
          Notiflix.Notify.warning(`Нічого не знайдено, спробуйте ще`);
          return;
        }
        this.setState({ totalHits: response.data.totalHits });
        const data = this.normalizeResponse(response);
        this.setState({ requestData: [...this.state.requestData, ...data] });
      } catch (error) {
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  render() {
    const { showModal, totalHits, page, loading } = this.state;
    return (
      <>
        <ImageGalleryList>
          {this.state.requestData.map(el => (
            <ImageGalleryItem
              key={el.id}
              onClick={this.onClickImg}
              dataGalleryItem={el}
            />
          ))}
          {loading && <Loader />}
        </ImageGalleryList>
        {totalHits > 12 * page &&
          this.state.requestData.length > 0 &&
          !loading && <Button onClick={this.loadMore}>Load More</Button>}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <SelectedModalWindowImage
              src={this.state.largeModalImgURL}
              alt=""
            />
            <Button onClick={this.toggleModal}>Close</Button>
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  key: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  dataGalleryItem: PropTypes.shape({
    id: PropTypes.any.isRequired,
    webURL: PropTypes.string.isRequired,
    largeURL: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
