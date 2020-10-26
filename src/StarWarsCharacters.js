import React, { useState } from 'react';
import { useDataFetch } from './hooks/useDataFetch';
import FilterChips from './components/FilterChips';
import './StarWarsCharacters.css';

export default function PeoplePage() {
  const {
    people,
    films,
    planets,
    species,
    starships,
    vehicles,
    isLoading,
  } = useDataFetch();

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
          <div className="container">
            {people &&
              people
                .filter((character) =>
                  FILM_FILTER_CATEGORIES[filmFilter](character)
                )
                .filter((character) =>
                  GENDER_FILTER_CATEGORIES[genderFilter](character)
                )
                .map((character) => (
                  <table key={character.url}>
                    <thead>
                      <tr>
                        <th colSpan={2}>{character.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Birth year</td>
                        <td>{character.birth_year}</td>
                      </tr>
                      <tr>
                        <td>Eye color</td>
                        <td>{character.eye_color}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{character.gender}</td>
                      </tr>
                      <tr>
                        <td>Hair color</td>
                        <td>{character.hair_color}</td>
                      </tr>
                      <tr>
                        <td>Height</td>
                        <td>{character.height}</td>
                      </tr>
                      <tr>
                        <td>Mass</td>
                        <td>{character.mass}</td>
                      </tr>
                      <tr>
                        <td>Skin color</td>
                        <td>{character.skin_color}</td>
                      </tr>
                      <tr>
                        <td>Homeworld</td>
                        <td>
                          {planets &&
                            planets.length > 0 &&
                            planets.find(
                              (planet) => planet.url === character.homeworld
                            ).name}
                        </td>
                      </tr>
                      <tr>
                        <td>Films</td>
                        {character.films.length > 0 ? (
                          <td>
                            <ul>
                              {films &&
                                films.length > 0 &&
                                character.films.map((url) => {
                                  const selectedFilm = films.find(
                                    (film) => film.url === url
                                  );
                                  return (
                                    <li key={selectedFilm.url}>
                                      {selectedFilm.title}
                                    </li>
                                  );
                                })}
                            </ul>
                          </td>
                        ) : (
                          <td>no data</td>
                        )}
                      </tr>
                      <tr>
                        <td>Species</td>
                        {species &&
                        species.length > 0 &&
                        character.species.length > 0 ? (
                          <>
                            {character.species.map((url) => {
                              const selectedSpecies = species.find(
                                (type) => type.url === url
                              );
                              return (
                                <td key={selectedSpecies.url}>
                                  {selectedSpecies.name}
                                </td>
                              );
                            })}
                          </>
                        ) : (
                          <td>no data</td>
                        )}
                      </tr>
                      <tr>
                        <td>Starships</td>
                        {character.starships.length > 0 ? (
                          <td>
                            <ul>
                              {starships &&
                                starships.length > 0 &&
                                character.starships.map((url) => {
                                  const selectedStarship = starships.find(
                                    (starship) => starship.url === url
                                  );
                                  return (
                                    <li key={selectedStarship.url}>
                                      {selectedStarship.name}
                                    </li>
                                  );
                                })}
                            </ul>
                          </td>
                        ) : (
                          <td>no data</td>
                        )}
                      </tr>
                      <tr>
                        <td>Vehicles</td>
                        {character.vehicles.length > 0 ? (
                          <td>
                            <ul>
                              {vehicles &&
                                vehicles.length > 0 &&
                                character.vehicles.map((url) => {
                                  const selectedVehicle = vehicles.find(
                                    (vehicle) => vehicle.url === url
                                  );
                                  return (
                                    <li key={selectedVehicle.url}>
                                      {selectedVehicle.name}
                                    </li>
                                  );
                                })}
                            </ul>
                          </td>
                        ) : (
                          <td>no data</td>
                        )}
                      </tr>
                      <tr>
                        <td>Url</td>
                        <td>{character.url}</td>
                      </tr>
                      <tr>
                        <td>Created</td>
                        <td>
                          {new Date(character.created).toLocaleDateString(
                            'de-DE'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Edited</td>
                        <td>
                          {new Date(character.edited).toLocaleDateString(
                            'de-DE'
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
          </div>
        </>
      )}
    </>
  );
}
