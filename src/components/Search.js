import React from 'react';
import PropTypes from 'prop-types';
import IconClear from './IconClear';
import IconSearch from './IconSearch';

Search.propTypes = {
  value: PropTypes.string,
  onQuery: PropTypes.func,
  onClear: PropTypes.func,
};

export default function Search({ value, onQuery, onClear }) {
  return (
    <form className="search__form">
      <label className="search__label">
        <IconSearch width="24" height="24" className="search__magnifier" />
        <input
          type="search"
          id="search"
          name="search"
          value={value}
          onChange={onQuery}
          autoComplete="off"
          aria-label="Search for a specific character"
          placeholder="Name"
          className="search__input"
        />
      </label>
      {value && (
        <button
          type="reset"
          aria-label="Clear search"
          onClick={onClear}
          className="search__button"
        >
          <IconClear width="18" height="18" />
        </button>
      )}
    </form>
  );
}
