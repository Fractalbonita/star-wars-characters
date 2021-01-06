import React from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
  value: PropTypes.string,
  onQuery: PropTypes.func,
  onClear: PropTypes.func,
};

export default function Search({ value, onQuery, onClear }) {
  return (
    <form>
      <label>
        <span>S</span>
        <input
          type="search"
          id="search"
          name="search"
          value={value}
          onChange={onQuery}
          autoComplete="off"
          aria-label="Search for a specific character"
          placeholder="Character name"
        />
        {value && (
          <button type="reset" aria-label="Clear search" onClick={onClear}>
            X
          </button>
        )}
      </label>
    </form>
  );
}
