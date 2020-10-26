import React from 'react';

export default function StarshipList({ starships, item }) {
  return (
    <ul>
      {starships.length > 0 &&
        item.starships.map((url) => {
          const selectedStarship = starships.find(
            (starship) => starship.url === url
          );
          return <li key={selectedStarship.url}>{selectedStarship.name}</li>;
        })}
    </ul>
  );
}
