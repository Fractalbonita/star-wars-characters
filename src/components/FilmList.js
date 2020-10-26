import React from 'react';
import PropTypes from 'prop-types';

FilmList.propTypes = {
  films: PropTypes.array,
  item: PropTypes.object,
};

export default function FilmList({ films, item }) {
  return (
    <ul className="resources__list">
      {films.length > 0 &&
        item.films.map((url) => {
          const selectedFilm = films.find((film) => film.url === url);
          return <li key={selectedFilm.url}>{selectedFilm.title}</li>;
        })}
    </ul>
  );
}
