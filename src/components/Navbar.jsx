import React, { useState } from 'react';
import ExtensionIcon from '@mui/icons-material/Extension';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import ProfileButton from './ProfileButton';

import CreatePost from './CreatePost';

const SearchBar = styled(TextField)({
  '& label': {
    color: '#ffffff',
  },
  '& label.Mui-focused': {
    color: '#ffffff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

function NavBarSearch(props) {
  const [text, setText] = useState("");


  async function handleSearch(event) {
    const value = event.target.value;
    if (value.length > 2) {
      setText(value);
      const response = await fetch("http://localhost:3000/utility/searchTopic/" + text);
      const result = await response.json();
      console.log(result);
    }
  }
  return (<>

    <div className="navbar-search">
      <SearchBar onChange={handleSearch} fullWidth id="search" label="Search Topics" variant="outlined" />
      <SearchIcon className="search-button" fontSize='large' />
    </div>
  </>

  )
}

function Navbar(props) {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo">
          <ExtensionIcon />
          <h1>Puzzles</h1>
        </div>
        <CreatePost />
        <NavBarSearch />
        <ProfileButton userName={props.username} profilePhoto={props.profilePhoto} />
      </div>

    </div>
  )
}

export default Navbar;
export  {SearchBar};