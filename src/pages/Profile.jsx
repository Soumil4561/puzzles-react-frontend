import React from 'react';
import TopicSidebar from '../components/TopicSidebar';
import "../stylesheets/Profile.css";
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import { useSelector } from 'react-redux';


function Profile() {
    const [loading, setLoading] = React.useState(true);
    const [username, setUsername] = React.useState(useParams().username);
    const [userInfo, setUserInfo] = React.useState(null);
    const [userPosts, setUserPosts] = React.useState(null);
    const [userComments, setUserComments] = React.useState(null);
    const [userSavedPost, setUserSavedPost] = React.useState(null);
    const [userLikedPost, setUserLikedPost] = React.useState(null);
    const [userLikedComments, setUserLikedComments] = React.useState(null);
    const [view, setView] = React.useState('posts');
    const loggedIn = useSelector((state) => state.profile.loggedIn);
    const usernameRedux = useSelector((state) => state.profile.username);


    const handleChange = (event, newValue) => {
        setView(newValue);
    };

    const getUserInfo = async () => {
        if(username === '' || username === undefined){
            setUsername(usernameRedux);            
        }
        const response = await fetch("http://localhost:3000/profile/"+username, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
            });
            if (response.status === 200) {
                const result = await response.json();
                console.log(result);
                if (result.user === null){
                    window.location.href = "/404";
                }
                    setUserInfo(result.user);
                    setUserPosts(result.posts);
                    setUserComments(result.comments);
                if (result.user.username === usernameRedux) {
                    // setUserSavedPost(result.savedPosts);
                    // setUserLikedPost(result.likedPosts);
                    // setUserLikedComments(result.likedComments)
                }
        }
        
    }

    React.useEffect(() => {
        (async () => {
            await getUserInfo();
        })();
    }, []);

    return(
        <>
            <div className='content-container'>

                <div className='profile-container'>
                   <div className='tabs-container'>
                        <div className='tab'>
                            <Tabs value={view} onChange={handleChange} centered>
                                <Tab label="Posts Created" value="userPosts" />
                                <Tab label="Comments Created" value="userComments" />
                            </Tabs>
                    </div> 
                </div>
            </div>
            </div>
        </>
    )
}

export default Profile;