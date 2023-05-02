import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Posts from '../../components/posts/posts';
import { useQueryClient } from '@tanstack/react-query';
import Users from '../../components/users/users';
import './search.scss';

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
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

const Search = () => {
  const queryClient = useQueryClient();
  const [value, setValue] = React.useState(0);
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    //queryClient.invalidateQueries(['posts', 'search']);
  }, [query]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
        <h1>Search results:</h1>
      </div>

      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Users" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Posts endpointName="search" searchQuery={query || ''} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Users searchQuery={query || ''} />
      </TabPanel>
    </Box>
  );
};

export default Search;
