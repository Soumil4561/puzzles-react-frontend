import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Topic from './pages/Topic';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';

function App() {
    const username = useSelector((state) => state.profile.username);
    const loggedIn = useSelector((state) => state.profile.loggedIn);
    const profilePhoto = useSelector((state) => state.profile.profilePhoto);

    return (
        <>
            <BrowserRouter>
                {loggedIn && <>
                    <Navbar profilePhoto={profilePhoto} username={username} />
                    <div className='content-container'>
                        <div className='topic-sidebar'>
                        </div>
                    </div></>
                }


                <Routes>
                    <Route path="/" element={loggedIn ? <Home /> : <Login />} />
                    <Route path="/home" element={loggedIn ? <Home /> : <Login />} />
                    <Route path="/topic/:topicName" element={<Topic />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;