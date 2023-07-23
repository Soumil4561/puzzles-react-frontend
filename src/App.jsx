import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Topic from './pages/Topic';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { Navigate } from 'react-router';
import { login } from './reducers/profileSlicer';
import ProfileSetup from './pages/ProfileSetup';

function App() {
    const [user,setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();

    React.useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:3000/auth/login/success', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            const content = await response.json();
            console.log(content);

            if (response.status === 200) {
                if(content.user.username){
                    setUser(content.user);
                    dispatch(login(content.user));
                    setLoading(false);
                }
                else{
                    window.location.href ='/register/setup'
                }
            }
            else if (response.status === 401) {
                setUser(null);
                setLoading(false);
            }
        })();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }  

    return (
        <>
            <BrowserRouter>
                {user && <Navbar/>}
                 <Routes>
                    <Route path="/" element={user ? <Home /> : <Login />} />
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/" /> :<Register />} />
                    <Route path="/register/setup" element={<ProfileSetup />} />
                    <Route path="/home" element={user ? <Home /> : <Login />} />
                    <Route path="/topic/:topicName" element={<Topic />} />
                    <Route path="/posts/:postID" element={<Post />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;