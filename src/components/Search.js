import React from 'react';
import PropTypes from 'prop-types';
import IconClear from './IconClear';
import IconSearch from './IconSearch';

Search.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
};

export default function Search({ searchTerm, setSearchTerm }) {
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleReset = () => {
    setSearchTerm('');
  };

  return (
    <form className="search__form">
      <label className="search__label">
        <IconSearch width="24" height="24" className="search__magnifier" />
        <input
          type="search"
          id="search"
          name="search"
          value={searchTerm}
          onChange={handleSearch}
          autoComplete="off"
          aria-label="Search for a specific character"
          placeholder="Name"
          className="search__input"
        />
      </label>
      {searchTerm && (
        <button
          type="reset"
          aria-label="Clear search"
          onClick={handleReset}
          className="search__button"
        >
          <IconClear width="18" height="18" />
        </button>
      )}
    </form>
  );
}
