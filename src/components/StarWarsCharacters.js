import React from 'react';
import PlanetList from './PlanetList';
import FilmList from './FilmList';
import SpeciesList from './SpeciesList';
import StarshipList from './StarshipList';
import VehicleList from './VehicleList';
import PropTypes from 'prop-types';

StarWarsCharacters.propTypes = {
  people: PropTypes.array,
  planets: PropTypes.array,
  films: PropTypes.array,
  species: PropTypes.array,
  starships: PropTypes.array,
  vehicles: PropTypes.array,
  filmCategories: PropTypes.object,
  filmFilter: PropTypes.string,
  genderCategories: PropTypes.object,
  genderFilter: PropTypes.string,
};

export default function StarWarsCharacters({
  people,
  planets,
  films,
  species,
  starships,
  vehicles,
  filmCategories,
  filmFilter,
  genderCategories,
  genderFilter,
}) {
  return (
    <>
      <div className="character__container">
        {people &&
          people
            .filter((character) => filmCategories[filmFilter](character))
            .filter((character) => genderCategories[genderFilter](character))
            .map((character) => (
              <table key={character.url} className="character__table">
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
                    {character.homeworld.length > 0 ? (
                      <td>
                        <PlanetList planets={planets} item={character} />
                      </td>
                    ) : (
                      <td>no data</td>
                    )}
                  </tr>
                  <tr>
                    <td>Films</td>
                    {character.films.length > 0 ? (
                      <td>
                        <FilmList films={films} item={character} />
                      </td>
                    ) : (
                      <td>no data</td>
                    )}
                  </tr>
                  <tr>
                    <td>Species</td>
                    {species.length > 0 && character.species.length > 0 ? (
                      <SpeciesList species={species} item={character} />
                    ) : (
                      <td>no data</td>
                    )}
                  </tr>
                  <tr>
                    <td>Starships</td>
                    {character.starships.length > 0 ? (
                      <td>
                        <StarshipList starships={starships} item={character} />
                      </td>
                    ) : (
                      <td>no data</td>
                    )}
                  </tr>
                  <tr>
                    <td>Vehicles</td>
                    {character.vehicles.length > 0 ? (
                      <td>
                        <VehicleList vehicles={vehicles} item={character} />
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
                      {new Date(character.created).toLocaleDateString('de-DE')}
                    </td>
                  </tr>
                  <tr>
                    <td>Edited</td>
                    <td>
                      {new Date(character.edited).toLocaleDateString('de-DE')}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
      </div>
    </>
  );
}
