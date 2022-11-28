import axios from 'axios';
import Notiflix from 'notiflix';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { AppBlock } from './App.styled';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SelectedModalWindowImage } from './ImageGallery/ImageGallery.styled';
import { Button } from './Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [requestData, setRequestData] = useState([]);
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [largeUrl, setLargeUrl] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const onClickImg = largeURL => {
    toggleModal();
    setLargeUrl(largeURL);
  };

  const loadMore = () => {
    setLoading(true);
    setPage(state => state + 1);
  };

  const normalizeResponse = response => {
    const nornalizeData = response.data.hits.map(
      ({ webformatURL, id, largeImageURL }) => ({
        id: id,
        webURL: webformatURL,
        largeURL: largeImageURL,
      })
    );

    return nornalizeData;
  };

  useEffect(() => {
    if (!searchValue.length) return;
    try {
      axios
        .get('/', {
          params: {
            q: searchValue,
            key: '31452049-9028b927189bb89bc78a16cd7',
            page: page,
            per_page: 12,
          },
        })
        .then(response => {
          if (!response.data.totalHits) {
            Notiflix.Notify.warning(`Нічого не знайдено, спробуйте ще`);
            return;
          }
          console.log(response);
          setTotalHits(response.data.totalHits);
          const data = normalizeResponse(response);
          console.log(data);
          setRequestData(state => [...state, ...data]);
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [searchValue, page]);

  function handleSubmitSearchBar(searchValue) {
    if (searchValue === '') {
      Notiflix.Notify.warning(`Ви не ввели жодного запиту`);
      return;
    }

    setSearchValue(searchValue);
    setRequestData([]);
    setPage(1);
    setLoading(false);
  }

  return (
    <AppBlock>
      <Searchbar onSubmit={handleSubmitSearchBar} />
      {requestData.length > 0 && (
        <ImageGallery
          toggle={toggleModal}
          requestData={requestData}
          largeImageURL={onClickImg}
        />
      )}
      {loading && <Loader />}
      {totalHits > 12 * page && totalHits && !loading && (
        <Button onClick={loadMore}>Load More</Button>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <SelectedModalWindowImage src={largeUrl} alt="" />
          <Button onClick={toggleModal}>Close</Button>
        </Modal>
      )}
    </AppBlock>
  );
};
