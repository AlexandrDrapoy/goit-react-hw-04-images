import { Component } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { AppBlock } from './App.styled';
import PropTypes from 'prop-types';
export class App extends Component {
  state = {
    showModal: false,
    searchValue: '',
  };

  handleSubmitSearchBar = searchValue => {
    if (searchValue === '') {
      Notiflix.Notify.warning(`Ви не ввели жодного запиту`);
    }

    this.setState({ searchValue: searchValue });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <AppBlock>
        <Searchbar onSubmit={this.handleSubmitSearchBar} />
        {searchValue.length > 0 && <ImageGallery searchValue={searchValue} />}
      </AppBlock>
    );
  }
}

App.propTypes = {
  onSubmit: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
};
