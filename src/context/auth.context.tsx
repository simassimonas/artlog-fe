import { createContext, ReactNode, useEffect, useState } from 'react';
import { ILoginData } from '../common/interfaces/login-data.interface';
import { IUser } from '../common/interfaces/user.interface';
import {
  axiosRequest,
  delay,
  getJsonParsedLocalStorageItem,
} from '../common/utils';
import { useContext } from 'react';

export interface IUserContextInterface {
  loggedInUser: IUser | null;
  login: (inputs: ILoginData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IUserContextInterface>({
  loggedInUser: null,
  login: async () => {},
  logout: async () => {},
});

type UserProvideProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: UserProvideProps) => {
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(
    getJsonParsedLocalStorageItem('user')
  );

  const login = async (inputs: ILoginData) => {
    const res = await axiosRequest.post('/auth/login', inputs);
    const userInfo = await axiosRequest.get(`/users/${res.data.user_id}`);
    setLoggedInUser({
      _id: userInfo?.data?._id,
      username: userInfo?.data?.username,
      name: userInfo?.data?.firstName + ' ' + userInfo?.data?.lastName,
      profilePic: userInfo?.data?.profilePic,
      firstName: userInfo?.data?.firstName,
      lastName: userInfo?.data?.lastName,
      email: userInfo?.data?.email,
    });
    // delay for protected route to get the new user value
    await delay(1);
  };

  const logout = async () => {
    setLoggedInUser(null);
    const res = await axiosRequest.get('/auth/logoutt');
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  axiosRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
