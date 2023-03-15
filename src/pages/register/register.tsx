import { Link } from 'react-router-dom';
import './register.scss';

const Register = () => {
  return (
    <div className="register">
      <div className="register__card">
        <h1>Register</h1>
        <form className="register__form">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="action-button">Register</button>
        </form>
        <span>
          Already have an account? <Link to="/login">Sign in here</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
