import './navbar.scss';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import defaultProfileImg from '../../assets/default-profile.png';
import artlogLogo from '../../assets/artlog-logo.png';

const Navbar = () => {
  const { loggedInUser, logout } = useContext(AuthContext);

  const search = (query: string) => {
    console.log('searchhh', query);
  };

  const handleLogout = () => {
    logout();
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
          <img
            src={
              loggedInUser?.profilePic
                ? `${process.env.REACT_APP_API}/users/images/${loggedInUser?.profilePic}`
                : defaultProfileImg
            }
            alt="logged in user's profile"
          />

          <span>{loggedInUser?.name}</span>
          <LogoutIcon onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
