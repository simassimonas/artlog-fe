import { createContext, ReactNode, useEffect, useState } from 'react';
import { IUser } from '../common/interfaces/user.interface';
import { getJsonParsedLocalStorageItem } from '../common/utils';

export interface IUserContextInterface {
  user: IUser | null;
  login: () => void;
}

export const AuthContext = createContext<IUserContextInterface>({
  user: null,
  login: () => {},
});

type UserProvideProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: UserProvideProps) => {
  const [user, setUser] = useState<IUser | null>(
    getJsonParsedLocalStorageItem('user')
  );

  const login = () => {
    //TO DO
    setUser({
      id: '123',
      username: 'simassmonas',
      name: 'Simas Simonazzzzsssssssssssssssssssssssssssssssssss',
      profile_pic:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    });
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
