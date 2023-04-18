import axios from 'axios';
import { useContext } from 'react';
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

// axiosRequest.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.log('lala');
//       logout();
//     }
//     return Promise.reject(error);
//   }
// );
