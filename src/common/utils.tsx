import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';

export const getJsonParsedLocalStorageItem = (key: string): any | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const axiosRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
  withCredentials: true,
});

export const delay = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
