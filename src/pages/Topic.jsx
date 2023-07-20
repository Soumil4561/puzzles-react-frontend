import React from 'react';
import { useParams } from 'react-router-dom';
import "../stylesheets/Topic.css";
import Posts from '../components/Posts';
import {LoadingTopic} from '../components/Loading';
import Button from '@mui/material/Button';

function Topic() {
    const [loading, setLoading] = React.useState(true);
    const [topic, setTopic] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const topicName = useParams().topicName;

    const getTopicInfo = async() => {
        console.log(process.env.BACKEND_URL);
        const response = await fetch(`http://localhost:3000/topic/${topicName}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            
            const result = await response.json();
            if (response.status === 200) {
                if(result.topic === null){
                    window.location.href = "/404";
                }
                setTopic(result.topic);
                setPosts(result.posts);
                setLoading(false);
            }
    }

    React.useEffect(() => {
        (async () => {
            await getTopicInfo();
        })();
    }, []);

    if (loading){
        return <LoadingTopic />
    }
    return(
        <>
        <div className="topicPage-header-container">
            <div className="topicPage-banner">
                <img src={topic.topicBanner} alt="topic-banner" />
            </div>
            <div className="topicPage-info">
                <div className="topicPage-id">
                    <div className="topicPage-avatar">
                        <img src={topic.topicPhoto} alt="topic-photo" />
                    </div>
                        <div className="topicPage-name">
                            <h3>{topic.topicName}</h3>
                        </div>
                        <div className='topicPage-followers'>
                            <h4>Follower Count: {topic.topicFollowers.length} followers</h4>
                        </div>
                </div>
                <div className='topicPage-join'>
                    <Button>Join</Button>
                </div>
            </div>
        </div>
        <div className="divider">
        </div>
        <div className="topicPage-content-container" >
            <Posts posts={posts} />
        </div>
        </>
    )

}

export default Topic;