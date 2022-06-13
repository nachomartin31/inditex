import { compressToBase64 } from 'lz-string';
import setExpiration from './setExpiration';

export default function StorageData(data, key) {
  const dataToString = compressToBase64(JSON.stringify(data));
  localStorage.setItem(key, JSON.stringify({ value: dataToString, expiration: setExpiration() }));
}
