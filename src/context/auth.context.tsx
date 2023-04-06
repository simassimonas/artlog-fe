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
  user: IUser | null;
  login: (inputs: ILoginData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IUserContextInterface>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

type UserProvideProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: UserProvideProps) => {
  const [user, setUser] = useState<IUser | null>(
    getJsonParsedLocalStorageItem('user')
  );

  const login = async (inputs: ILoginData) => {
    const res = await axiosRequest.post('/auth/login', inputs);
    const userInfo = await axiosRequest.get(`/users/${res.data.user_id}`);
    setUser({
      _id: userInfo?.data?._id,
      username: userInfo?.data?.username,
      name: userInfo?.data?.firstName + ' ' + userInfo?.data?.lastName,
      profilePic: userInfo?.data?.profilePic,
    });
    // delay for protected route to get the new user value
    await delay(1);
  };

  const logout = async () => {
    const res = await axiosRequest.get('/auth/logout');
    setUser(null);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
