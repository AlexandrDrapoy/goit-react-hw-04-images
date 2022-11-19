import { Component } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';

import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    showModal: false,
    searchValue: '',
  };

  handleSubmitSearchBar = searchValue => {
    this.setState({ searchValue: searchValue });
  };

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { searchValue } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmitSearchBar} />
        {searchValue.length > 0 && <ImageGallery searchValue={searchValue} />}
      </div>
    );
  }
}
