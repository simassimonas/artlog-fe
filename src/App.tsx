import './App.scss';
import './styles/global.scss';
import Login from './pages/login/login';
import Register from './pages/register/register';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import { ProtectedRouteProps } from './common/types/protected-route-props.type';
import { theme } from './styles/mui-theme';
import { ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';
import Posting from './pages/posting/posting';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Search from './pages/search/search';
import Settings from './pages/settings/settings';
import PostPage from './pages/post-page/post-page';
import { ToastContainer } from 'react-toastify';
import Chat from './pages/chat/chat';

function App() {
  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { loggedInUser } = useContext(AuthContext);
    if (!loggedInUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Header />
          <div className="main">
            <Outlet />
          </div>
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          containerId={'layout'}
          enableMultiContainer
          style={{ padding: 0 }}
          toastStyle={{ padding: 0 }}
          bodyStyle={{ padding: 0 }}
        />
      </QueryClientProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: (
            <div className="main__feed">
              <Home />
            </div>
          ),
        },
        {
          path: '/profile/:id',
          element: (
            <div className="main__feed">
              <Profile />
            </div>
          ),
        },
        {
          path: '/workshop',
          element: (
            <div className="main__feed">
              <Posting />
            </div>
          ),
        },
        {
          path: '/posts/:id',
          element: (
            <div className="main__feed">
              <PostPage />
            </div>
          ),
        },
        {
          path: '/search',
          element: (
            <div className="main__feed">
              <Search />
            </div>
          ),
        },
        {
          path: '/settings',
          element: (
            <div className="main__feed">
              <Settings />
            </div>
          ),
        },
        {
          path: '/chat/:id?',
          element: (
            <div className="main__chat">
              <Chat />
            </div>
          ),
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
