import React, { useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { AuthContext, UserProvideProps } from './auth.context';

interface SocketConnections {
  notifications: Socket | null;
  messages: Socket | null;
}

export const SocketContext = React.createContext<SocketConnections>({
  notifications: null,
  messages: null,
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
      messages: null,
    }
  );

  useEffect(() => {
    if (loggedInUser) {
      const notificationsSocket = io(
        `${process.env.REACT_APP_API}/notifications`,
        socketOptions
      );

      const messagesSocket = io(
        `${process.env.REACT_APP_API}/messages`,
        socketOptions
      );

      setSocketConnections({
        notifications: notificationsSocket,
        messages: messagesSocket,
      });

      return () => {
        notificationsSocket.disconnect();
        messagesSocket.disconnect();
      };
    } else {
      setSocketConnections({
        notifications: null,
        messages: null,
      });
    }
  }, [loggedInUser]);

  return (
    <SocketContext.Provider value={socketConnections}>
      {children}
    </SocketContext.Provider>
  );
};
