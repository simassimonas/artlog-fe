import './header.scss';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import { AuthContext } from '../../context/auth.context';
import { Fragment, useContext, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import defaultProfileImg from '../../assets/default-profile.png';
import artlogLogo from '../../assets/artlog-logo.png';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CreateIcon from '@mui/icons-material/Create';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import NotificationBell from '../notifications/notification-bell/notification-bell';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const search = (query: string) => {
    navigate(`/search?query=${query}`);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = [
    {
      key: 'workshop',
      component: (
        <IconButton component={Link} to="/workshop">
          <CreateIcon color="secondary" />
        </IconButton>
      ),
    },
    {
      key: 'chat',
      component: (
        <IconButton component={Link} to="/chat">
          <ChatOutlinedIcon color="secondary" />
        </IconButton>
      ),
    },
    {
      key: 'userProfile',
      component: (
        <IconButton component={Link} to={`profile/${loggedInUser?._id}`}>
          <div className="header__user">
            <img
              src={
                loggedInUser?.profilePic
                  ? `${process.env.REACT_APP_API}/users/images/${loggedInUser?.profilePic}`
                  : defaultProfileImg
              }
              alt="logged in user's profile"
            />
          </div>
        </IconButton>
      ),
    },
  ];

  const mobileMenu = (
    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
      <List>
        <ListItem key="menuIcon">
          {' '}
          <IconButton edge="end" color="secondary" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </ListItem>
        {[...drawerItems].reverse().map((item) => (
          <ListItem onClick={handleDrawerToggle} key={item.key}>
            {item.component}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const regularMenu = (
    <>
      {drawerItems.map((item) => (
        <Fragment key={item.key}>{item.component}</Fragment>
      ))}
    </>
  );

  return (
    <div className="header">
      <div className="header__left">
        <Link to="">
          <img src={artlogLogo} alt="logged in user's profile" />
        </Link>
      </div>
      <div className="header__middle">
        <SearchBar
          placeholder="Search for people or images"
          onSearch={search}
        />
      </div>
      <div className="header__right">
        <NotificationBell />
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="secondary"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            {mobileMenu}
          </>
        ) : (
          <>{regularMenu}</>
        )}
      </div>
    </div>
  );
};

export default Header;
function componentDidMount() {
  throw new Error('Function not implemented.');
}
