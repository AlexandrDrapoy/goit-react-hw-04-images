import {
  SearchbarWrap,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';
export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = evt => setSearchValue(evt.currentTarget.value);
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(searchValue.toLowerCase().trim());
  };

  return (
    <SearchbarWrap>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          name="serchFormField"
          type="text"
          autoComplete="off"
          autoFocus
          value={searchValue}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarWrap>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
