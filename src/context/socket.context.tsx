import React, { useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { AuthContext, UserProvideProps } from './auth.context';

interface SocketConnections {
  notifications: Socket | null;
  chat: Socket | null;
}

export const SocketContext = React.createContext<SocketConnections>({
  notifications: null,
  chat: null,
});

const socketOptions = {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
  withCredentials: true,
};

export const SocketContextProvider = ({ children }: UserProvideProps) => {
  const { loggedInUser } = useContext(AuthContext);
  const [socketConnections, setSocketConnections] = useState<SocketConnections>(
    {
      notifications: null,
      chat: null,
    }
  );

  useEffect(() => {
    if (loggedInUser) {
      const notificationsSocket = io(
        `${process.env.REACT_APP_API}/notifications`,
        socketOptions
      );

      //const chatSocket = io(`${process.env.REACT_APP_API}/chat`, socketOptions);

      setSocketConnections({
        notifications: notificationsSocket,
        chat: null,
      });

      return () => {
        notificationsSocket.disconnect();
        //chatSocket.disconnect();
      };
    } else {
      setSocketConnections({
        notifications: null,
        chat: null,
      });
    }
  }, [loggedInUser]);

  return (
    <SocketContext.Provider value={socketConnections}>
      {children}
    </SocketContext.Provider>
  );
};
