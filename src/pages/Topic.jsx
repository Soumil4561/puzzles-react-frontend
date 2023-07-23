import React from 'react';
import { useParams } from 'react-router-dom';
import "../stylesheets/Topic.css";
import Posts from '../components/Posts';
import { LoadingTopic } from '../components/Loading';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

function Topic() {
    const [loading, setLoading] = React.useState(true);
    const [topic, setTopic] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const [follows, setFollows] = React.useState(false);
    const userID = useSelector((state) => state.userID);

    const topicName = useParams().topicName;

    const getTopicInfo = async () => {
        const response = await fetch(`http://localhost:3000/topic/${topicName}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();
        if (response.status === 200) {
            if (result.topic === null) {
                window.location.href = "/404";
            }
            setTopic(result.topic);
            setPosts(result.posts);
            setLoading(false);
        }

        if (userID !== null) {
            const topicID = result.topic._id;
            const response2 = await fetch(`http://localhost:3000/topic/${topicID}/userFollows`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });

            const result2 = await response2.json();
            if (response.status === 200) {
                setFollows(result2.follows);
            }
        }
    }

    const follow = async () => {
        if (userID === null) {
            window.location.href = "/login";
        }
        
        const response = await fetch(`http://localhost:3000/topic/${topic._id}/follow`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();
        if (response.status === 200) {
            setFollows(result.follows);
        }
    }

    React.useEffect(() => {
        (async () => {
            await getTopicInfo();
        })(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <LoadingTopic />
    }
    return (
        <>
            <div className="topicPage-header-container">
                <div className="topicPage-banner">
                    <img src={topic.topicBanner} alt="topic-banner" />
                </div>
                <div className="topicPage-info">
                    <div className="topicPage-id">
                        <div className="topicPage-avatar">
                            <img src={topic.topicPhoto} alt="topic-avatar" />
                        </div>
                        <div className="topicPage-name">
                            <h3>{topic.topicName}</h3>
                        </div>
                        <div className='topicPage-followers'>
                            <h4>Follower Count: {topic.topicFollowers.length} followers</h4>
                        </div>
                    </div>
                    <div className='topicPage-join'>
                        {(userID !== null && follows === false) ?
                            <Button variant="contained" onClick={follow} >Follow</Button> :
                            <Button variant="contained" onClick={follow} >Unfollow</Button>
                        }

                    </div>
                </div>
            </div>
            <div className="divider">
            </div>
            <div className="topicPage-content-container" >
                <div className="topicPage-posts">
                    <Posts posts={posts} />
                </div>
                <div className="topicPage-sidebar">
                    <div className="topicPage-sidebar-container">
                    </div>
                </div>
            </div>
        </>
    )

}

export default Topic;