import './navbar.scss';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import defaultProfileImg from '../../assets/default-profile.png';
import artlogLogo from '../../assets/artlog-logo.png';

const Navbar = () => {
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const search = (query: string) => {
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link to="">
          <img src={artlogLogo} alt="logged in user's profile" />
        </Link>
      </div>
      <div className="navbar__middle">
        <SearchBar
          placeholder="Search for people or images"
          onSearch={search}
        />
      </div>
      <div className="navbar__right">
        <ChatOutlinedIcon />
        <div className="navbar__user">
          <Link to={`profile/${loggedInUser?._id}`}>
            <img
              src={
                loggedInUser?.profilePic
                  ? `${process.env.REACT_APP_API}/users/images/${loggedInUser?.profilePic}`
                  : defaultProfileImg
              }
              alt="logged in user's profile"
            />
          </Link>
          <span>{loggedInUser?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
