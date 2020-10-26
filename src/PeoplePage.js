import React, { useState } from 'react';
import { useSwApi } from './hooks/useSwApi';
import FilterChips from './components/FilterChips';
import StarWarsCharacters from './StarWarsCharacters';

export default function PeoplePage() {
  const [people, isLoading] = useSwApi('people');
  const [planets] = useSwApi('planets');
  const [films] = useSwApi('films');
  const [species] = useSwApi('species');
  const [starships] = useSwApi('starships');
  const [vehicles] = useSwApi('vehicles');

  const [filmFilter, setFilmFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');

  const FILM_FILTER_CATEGORIES = { All: () => true };
  films.forEach((film) => {
    FILM_FILTER_CATEGORIES[film.title] = (character) =>
      character.films.includes(film.url);
  });

  const GENDER_FILTER_CATEGORIES = { All: () => true };
  people
    .map((character) => character.gender)
    .forEach((sex) => {
      GENDER_FILTER_CATEGORIES[sex] = (character) => character.gender === sex;
    });

  const FILM_FILTER_NAMES = Object.keys(FILM_FILTER_CATEGORIES);

  const GENDER_FILTER_NAMES = Object.keys(GENDER_FILTER_CATEGORIES);

  return (
    <>
      <h1 className="heading">Star Wars Characters</h1>
      {isLoading ? (
        <h2>Loading data ...</h2>
      ) : (
        <>
          <p>Filter by film</p>
          <FilterChips
            filter={filmFilter}
            onFilter={(film) => setFilmFilter(film)}
            filterNames={FILM_FILTER_NAMES}
          />
          <p>Filter by gender</p>
          <FilterChips
            filter={genderFilter}
            onFilter={(gender) => setGenderFilter(gender)}
            filterNames={GENDER_FILTER_NAMES}
          />
          <StarWarsCharacters
            people={people}
            planets={planets}
            films={films}
            species={species}
            starships={starships}
            vehicles={vehicles}
            filmCategories={FILM_FILTER_CATEGORIES}
            filmFilter={filmFilter}
            genderCategories={GENDER_FILTER_CATEGORIES}
            genderFilter={genderFilter}
          />
        </>
      )}
    </>
  );
}
