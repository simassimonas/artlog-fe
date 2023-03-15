import './navbar.scss';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const search = (query: string) => {
    console.log('searchhh', query);
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
          <img src={user?.profile_pic} alt="logged in user's profile" />
          <span>{user?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
