import axios from 'axios';

export default async function fetchDataFromApi(url) {
  const { data } = await axios.get(url);
  return data;
}
