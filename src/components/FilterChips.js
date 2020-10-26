import React from 'react';

export default function FilterChips({ filter, onFilter, filterNames }) {
  return (
    <>
      {filterNames.map((category) => (
        <button
          key={category}
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
