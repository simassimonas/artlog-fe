import './navbar.scss';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

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
          <span>ArtLog</span>
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
          <img src={user?.profilePic} alt="logged in user's profile" />
          <span>{user?.name}</span>
          <LogoutIcon onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
