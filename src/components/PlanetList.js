import React from 'react';
import PropTypes from 'prop-types';

PlanetList.propTypes = {
  planets: PropTypes.array,
  item: PropTypes.object,
};

export default function PlanetList({ planets, item }) {
  return (
    <>
      {planets.length > 0 &&
        planets.find((planet) => planet.url === item.homeworld).name}
    </>
  );
}
