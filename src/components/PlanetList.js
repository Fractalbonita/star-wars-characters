import React from 'react';

export default function PlanetList({planets, item}) {
  return (
    <>
      {planets.length > 0 &&
        planets.find((planet) => planet.url === item.homeworld).name}
    </>
  );
}
