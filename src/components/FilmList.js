import React from 'react';

export default function FilmList({films, item }) {
  return (
    <ul>
      {films.length > 0 &&
        item.films.map((url) => {
          const selectedFilm = films.find((film) => film.url === url);
          return <li key={selectedFilm.url}>{selectedFilm.title}</li>;
        })}
    </ul>
  );
}
