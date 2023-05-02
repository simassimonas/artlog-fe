import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { AuthContextProvider } from './context/auth.context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SocketContextProvider } from './context/socket.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          containerId={'global'}
          enableMultiContainer
        />
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
