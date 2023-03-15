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

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="feed">
          <div className="feed__block">
            <Outlet />
          </div>
        </div>
      </div>
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
