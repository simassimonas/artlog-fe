import axios from 'axios';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { toast } from 'react-toastify';
import { axiosRequest } from '../../common/utils';

const Register = () => {
  const formRef: any = useRef();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!formRef.current.reportValidity()) return;

    try {
      await axiosRequest.post(
        `${process.env.REACT_APP_API}/auth/register`,
        inputs
      );
      toast.success('Sign up successful. Please log in.', { autoClose: 5000 });
      navigate('/login');
    } catch (error: any) {
      if (error.response.status == 400)
        setError('Invalid input, please check your input and try again');
      if (error.response.status == 409) setError('Username already exists');
      if (error.response.status == 500)
        setError('Something went wrong. Please try again later');
    }
  };

  return (
    <div className="register">
      <div className="register__card">
        <h1>Register</h1>
        <form className="register__form" ref={formRef}>
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password (min length 3)"
            maxLength={20}
            name="password"
            onChange={handleChange}
            required
          />
          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="action-button"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
        <span>
          Already have an account? <Link to="/login">Sign in here</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
