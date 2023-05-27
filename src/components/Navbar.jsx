import React from 'react';
import ExtensionIcon from '@mui/icons-material/Extension';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-logo">
                    <ExtensionIcon />
                    <h1>Puzzles</h1>
                </div>
                <div className="navbar-search">
                    <CreateIcon className="create-button" fontSize='large'/>
                    <SearchBar fullWidth id="search" label="Search Topics" variant="outlined" />
                    <SearchIcon className="search-button" fontSize='large'/>
                </div>
                <div className="navbar-profile">
                    <AccountCircleIcon className="profile-button" fontSize='large'/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;