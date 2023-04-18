import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, IUserContextInterface } from '../../context/auth.context';
import './login.scss';
import { useContext, useState } from 'react';
import { ILoginData } from '../../common/interfaces/login-data.interface';
import artlogLogo from '../../assets/artlog-logo.png';

const Login = () => {
  const { loggedInUser, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState<ILoginData>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate('/');
    } catch (error: any) {
      setError('Something went wrong. Please try again later');
      if (error.response.status == 401)
        setError('You have entered an invalid username or password');
    }
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src={artlogLogo} alt="logged in user's profile" />
      </div>
      <div className="login__card">
        <h1>Login</h1>
        <form className="login__form">
          <input
            type="username"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="action-button" onClick={handleLogin}>
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
