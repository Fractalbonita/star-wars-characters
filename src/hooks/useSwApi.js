import { useEffect, useState } from 'react';

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

export const useSwApi = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData(endpoint).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [endpoint]);

  return [data, isLoading];
};
