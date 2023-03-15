import { Link } from 'react-router-dom';
import { AuthContext, IUserContextInterface } from '../../context/auth.context';
import './login.scss';
import { useContext } from 'react';

const Login = () => {
  const { user, login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="login">
      <div className="login__card">
        <h1>Login</h1>
        <form className="login__form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="action-button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <span>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
