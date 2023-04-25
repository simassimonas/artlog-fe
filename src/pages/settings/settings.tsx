import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Posts from '../../components/posts/posts';
import { useQueryClient } from '@tanstack/react-query';
import Users from '../../components/users/users';
import LogoutIcon from '@mui/icons-material/Logout';
import './settings.scss';
import { AuthContext } from '../../context/auth.context';
import ProfilePic from '../../components/settings/profile-pic/profile-pic';
import Privacy from '../../components/settings/privacy/privacy';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            width: '100%',
          }}
        >
          <Typography
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Settings = () => {
  const { loggedInUser, logout } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [value, setValue] = React.useState(0);
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    //queryClient.invalidateQueries(['posts', 'search']);
  }, [query]);

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    if (newValue === 2) logout();
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '90%',
        '@media (max-width: 600px)': {
          width: '100%',
        },
      }}
    >
      <div className="search__header">
        <h1>Settings</h1>
      </div>

      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Profile picture" {...a11yProps(0)} />
          <Tab label="Privacy" {...a11yProps(1)} />
          <Tab
            icon={<LogoutIcon />}
            iconPosition="end"
            label="Logout"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="settings__wrapper">
          <ProfilePic />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="settings__wrapper">
          <Privacy />
        </div>
      </TabPanel>
    </Box>
  );
};

export default Settings;
