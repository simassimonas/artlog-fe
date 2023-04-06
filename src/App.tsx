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
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import { ProtectedRouteProps } from './common/types/protected-route-props.type';
import { theme } from './styles/mui-theme';
import { ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';
import Posting from './pages/posting/posting';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
          <div className="feed">
            <div className="feed__block">
              <Outlet />
            </div>
          </div>
        </div>
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
          path: '/posting',
          element: <Posting />,
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
