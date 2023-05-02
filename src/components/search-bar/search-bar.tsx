import React, { useState } from 'react';
import './search-bar.scss';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

const SearchBar = ({ initialValue = '', placeholder, onSearch }: any) => {
  const theme = useTheme();

  const [inputValue, setInputValue] = useState(initialValue);

  const handleSearch = (event: any) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <Paper
      component="form"
      elevation={1}
      onSubmit={handleSearch}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        [theme.breakpoints.down('sm')]: {
          width: '100%', // change width for phones
        },
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
