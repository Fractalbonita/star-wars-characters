import React, { useEffect, useState } from 'react';
import './StarWarsCharacters.css';

export default function StarWarsCharacters() {
  const [people, setPeople] = useState([]);
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filmFilter, setFilmFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');

  useEffect(() => {
    Promise.all([
      getData('people'),
      getData('films'),
      getData('planets'),
      getData('species'),
      getData('starships'),
      getData('vehicles'),
    ]).then(([people, films, planets, species, starships, vehicles]) => {
      setPeople(people);
      setFilms(films);
      setPlanets(planets);
      setSpecies(species);
      setStarships(starships);
      setVehicles(vehicles);
      setLoading(!isLoading);
    });
  }, []);

  const getData = async (endpoint) => {
    const data = localStorage.getItem(endpoint);
    if (data) {
      return Promise.resolve(JSON.parse(data));
    }
    const baseURL = 'https://swapi.dev/api';
    let nextPage = baseURL + '/' + endpoint + '/';
    let result = [];
    try {
      do {
        const response = await fetch(nextPage);
        const data = await response.json();
        result = result.concat(data.results);
        nextPage = data.next;
      } while (nextPage);
    } catch (error) {
      console.log(error);
    }
    localStorage.setItem(endpoint, JSON.stringify(result));
    return result;
  };

  const FILM_FILTER_CATEGORIES = { All: () => true };
  films.forEach((film) => {
    FILM_FILTER_CATEGORIES[film.title] = (character) =>
      character.films.includes(film.url);
  });

  const GENDER_FILTER_CATEGORIES = {
    All: () => true,
    Female: (character) => character.gender === 'female',
    Male: (character) => character.gender === 'male',
    None: (character) => character.gender === 'n/a',
  };

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
          {FILM_FILTER_NAMES.map((film) => (
            <button
              key={film}
              type="button"
              name="filmFilter"
              aria-pressed={filmFilter === film}
              onClick={() => setFilmFilter(film)}
            >
              {film}
            </button>
          ))}
          <p>Filter by gender</p>
          {GENDER_FILTER_NAMES.map((gender) => (
            <button
              key={gender}
              type="button"
              name="genderFilter"
              aria-pressed={genderFilter === gender}
              onClick={() => setGenderFilter(gender)}
            >
              {gender}
            </button>
          ))}
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
                        <td>{character.homeworld}</td>
                      </tr>
                      <tr>
                        <td>Films</td>
                        {character.films.length > 0 ? (
                          <td>
                            <ul>
                              {character.films.map((url) => {
                                const selectedFilm = films.find(
                                  (film) => film.url === url
                                );
                                return <li>{selectedFilm.title}</li>;
                              })}
                            </ul>
                          </td>
                        ) : (
                          <td>no data</td>
                        )}
                      </tr>
                      <tr>
                        <td>Species</td>
                        {character.species.length > 0 ? (
                          <td>
                            <ul>
                              {character.species.map((url) => {
                                const selectedSpecies = species.find(
                                  (type) => type.url === url
                                );
                                return <li>{selectedSpecies.name}</li>;
                              })}
                            </ul>
                          </td>
                        ) : (
                          <td>no data</td>
                        )}
                      </tr>
                      <tr>
                        <td>Starships</td>
                        {character.starships.length > 0 ? (
                          <td>
                            <ul>
                              {character.starships.map((url) => {
                                const selectedStarship = starships.find(
                                  (starship) => starship.url === url
                                );
                                return <li>{selectedStarship.name}</li>;
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
                              {character.vehicles.map((url) => {
                                const selectedVehicle = vehicles.find(
                                  (vehicle) => vehicle.url === url
                                );
                                return <li>{selectedVehicle.name}</li>;
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