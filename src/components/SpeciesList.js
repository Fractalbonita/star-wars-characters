import React from 'react';
import PropTypes from 'prop-types';

SpeciesList.propTypes = {
  species: PropTypes.array,
  item: PropTypes.object,
};

export default function SpeciesList({ species, item }) {
  return (
    <>
      {item.species.map((url) => {
        const selectedSpecies = species.find((type) => type.url === url);
        return <td key={selectedSpecies.url}>{selectedSpecies.name}</td>;
      })}
    </>
  );
}
