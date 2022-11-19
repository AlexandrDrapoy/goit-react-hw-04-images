import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import axios from 'axios';

import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.headers.common['key'] = process.env.REACT_APP_API_KEY;
export class ImageGallery extends Component {
  state = {
    requestData: [],
    page: null,
    loading: false,
    showModal: false,
  };
  toggleModal = () => {
    console.log(this.state);
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onClickImg = largeURL => {
    this.toggleModal();
    this.setState({ largeModalImgURL: largeURL });
  };

  loadMore = () => {
    console.log(this.state.page);
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log(this.state.page);
  };

  normalizeResponse = response => {
    const nornalizeData = response.data.hits.map(
      ({ webformatURL, id, largeImageURL }) => ({
        id: id,
        webURL: webformatURL,
        largeURL: largeImageURL,
      })
    );

    console.log(nornalizeData);
    return nornalizeData;
  };
  componentDidMount() {
    this.setState({ page: 1 });
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchValue = prevProps.searchValue;
    const nextSearchValue = this.props.searchValue;
    if (prevSearchValue !== nextSearchValue) {
      this.setState({
        requestData: [],
        page: 1,
        loading: false,
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
    const { showModal } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {this.state.requestData.map(el => (
            <ImageGalleryItem
              key={el.id}
              onClick={this.onClickImg}
              dataGalleryItem={el}
            />
          ))}
        </ul>
        <Button type="button" onClick={this.loadMore}>
          Load More
        </Button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeModalImgURL} alt="" />
            <Button onClick={() => this.toggleModal}>Close</Button>
          </Modal>
        )}
      </>
    );
  }
}
