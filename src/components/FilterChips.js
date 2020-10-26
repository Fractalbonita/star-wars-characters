import React from 'react';
import PropTypes from 'prop-types';

FilterChips.propTypes = {
  filter: PropTypes.string,
  onFilter: PropTypes.func,
  filterName: PropTypes.string,
};

export default function FilterChips({ filter, onFilter, filterNames }) {
  return (
    <>
      {filterNames.map((category) => (
        <button 
          key={category}
          className="filterChip__button"
          type="button"
          name="filmFilter"
          aria-pressed={filter === category}
          onClick={() => onFilter(category)}
        >
          {category}
        </button>
      ))}
    </>
  );
}
