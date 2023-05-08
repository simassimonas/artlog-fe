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
          <div className="feed">
            <div className="feed__block">
              <Outlet />
            </div>
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
          element: <Home />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
        {
          path: '/workshop',
          element: <Posting />,
        },
        {
          path: '/posts/:id',
          element: <PostPage />,
        },
        {
          path: '/search',
          element: <Search />,
        },
        {
          path: '/settings',
          element: <Settings />,
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
