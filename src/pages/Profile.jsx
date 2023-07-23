import React from 'react';
import TopicSidebar from '../components/TopicSidebar';
import "../stylesheets/Profile.css";
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import DateTimeParser from '../components/utilities/datetimeparser';


function Profile() {
    const [loading, setLoading] = React.useState(true);
    const [userInfo, setUserInfo] = React.useState(null);
    const [userPosts, setUserPosts] = React.useState(null);
    const [userComments, setUserComments] = React.useState(null);
    const [userSavedPost, setUserSavedPost] = React.useState(null);
    const [userLikedPost, setUserLikedPost] = React.useState(null);
    const [userLikedComments, setUserLikedComments] = React.useState(null);
    const [view, setView] = React.useState('userPosts');
    const userID = useSelector((state) => state.userID);
    const [posts, setPosts] = React.useState(null);



    const handleChange = (event, newValue) => {
        if(newValue === 'userPosts') UserPosts('created');
        if(newValue === 'userLikedPosts') UserPosts('liked');
        if(newValue === 'userSavedPosts') UserPosts('saved');
        setView(newValue);
    };

    const post = {
        width: "100%",
        backgroundColor: "var(--secondary-color)",
        color: "#ffffff",
    }

    const PostCards = (props) => {
        const {date,time} = DateTimeParser(props.post.postCreated);
        return(
            <div className="post-container">
                <Card className="post" sx={post}>
                <CardActionArea onClick={() => {
                    window.location.href = `/posts/${props.post._id}`;
                }}>
                <div className="post-title">
                    <CardHeader 
                        title={props.post.postTitle}
                        subheader={`on ${date} at ${time}`}
                        subheaderTypographyProps={{color: "var(--primary-text-color)"}}
                    />
                </div>
                <div className="post-media">
                    <CardContent>
                        {props.post.postContent}
                    </CardContent>
                </div>
                </CardActionArea>
            </Card>
        </div>
        )
    }

    const UserPosts = async (type) => {
        const response = await fetch(`http://localhost:3000/profile/posts?type=${type}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();
        if (response.status === 200) {
            setPosts(result);
        }
    }

    const getUserInfo = async () => {
        if (userID === null) {
            window.location.href = "/login";
        }
        const response = await fetch(`http://localhost:3000/profile`,{
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();
        console.log(result);
        if (response.status === 200) {
            setUserInfo(result.user);
            await UserPosts('created');
            console.log(posts);
            setLoading(false);
        }
    }

    React.useEffect(() => {
        (async () => {
            await getUserInfo();
        })();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className='content-container'>
                <div className='sidebar-container'>
                    <TopicSidebar />
                </div>
                <div className='profile-container'>
                    <div className='tabs-container'>
                        <div className='tab'>
                            <Tabs value={view} onChange={handleChange} centered>
                                <Tab label="My Posts" value="userPosts" />
                                <Tab label="Liked Posts" value="userLikedPosts" />
                                <Tab label="Saved Posts" value="userSavedPosts" />
                            </Tabs>
                        </div>
                    </div>
                    <div className='profile-content-container'>
                        <div className='user-posts-container'>
                            {posts.map((post) => { return( <PostCards post = {post} /> ) } )}
                        </div>
                    </div>
                </div>
                <div className='about-container'>

                </div>
            </div>
        </>
    )
}

export default Profile;