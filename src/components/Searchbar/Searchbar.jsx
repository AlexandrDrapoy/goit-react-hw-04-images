import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };
  handleChange = e => {
    console.log(e);
    this.setState({
      searchValue: e.currentTarget.value,
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const searchValue = this.state.searchValue.toLowerCase().trim();
    this.props.onSubmit(searchValue);
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            name="serchFormField"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchValue}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
