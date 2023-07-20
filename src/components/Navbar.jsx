import React, { useState } from 'react';
import ExtensionIcon from '@mui/icons-material/Extension';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './utilities/StyledTextField';
import ProfileButton from './ProfileButton';
import CreatePost from './CreatePost';
import { Autocomplete } from '@mui/material';
import CreateTopic from './CreateTopic';
import { useSelector } from 'react-redux';

function NavBarSearch(props) {
  const [text, setText] = useState("");
  const [topics, setTopics] = useState([]);

  function gotoTopicPage() {
    if(text.length > 0) window.location.href = "/topic/" + text;
  }

  async function handleSearch(event) {
    if (text.length > 0) {
      const response = await fetch("http://localhost:3000/utility/searchTopic/" + text);
      const result = await response.json();
      console.log(result);
      setTopics(result);
    }
  }

  async function getTopicList() {
    console.log("hey");
    const response = await fetch("http://localhost:3000/utility/getTopicList");
    const result = await response.json();
    console.log(result);
    setTopics(result);
  }

  return (<>

    <div className="navbar-search">
      <Autocomplete
        id="search-bar"
        options={topics.map((option) => option.topicName)}
        sx={{ "width": "90%", "margin": "0"}}
        renderInput={(params) => (
          <SearchBar {...params}
            label="Search"
            margin="none"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
            onChange={(event) => {
              setText(event.target.value);
              handleSearch(event);
            }}
            onClick={() => {
              getTopicList();
            }} />
        )}
      />
      <SearchIcon className="search-button" fontSize='large' onClick={gotoTopicPage}/>
    </div>
  </>

  )
}

function Navbar() {

  const username = useSelector(state => state.profile.username);
  const profilePhoto = useSelector(state => state.profile.profilePhoto);
  return (
    <header>
    <div className="navbar-container">
        <div className="navbar-logo" onClick={() => {
          window.location.href = "/";
        }}>
          <ExtensionIcon  />
          <h1>Puzzles</h1>
        </div>
        <CreateTopic />
        <NavBarSearch />
        <CreatePost />
        <ProfileButton username={username} profilePhoto={profilePhoto}/>
      

    </div>
    </header>
  )
}

export default Navbar;