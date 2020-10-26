import { useEffect, useState } from 'react';

export function useDataFetch() {
  const [people, setPeople] = useState([]);
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

  return [people, films, planets, species, starships, vehicles, isLoading];
}
