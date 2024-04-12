import { Skeleton } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const AboutSidebar = (props) => {

    const [loading, setLoading] = React.useState(true);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState(null);

    const Loading = () => {
        return (
            <div className='about-sidebar-container'>
                <Skeleton variant="rectangular" width={300} height={500} />
            </div>
        )
    }


    const Home = async () => {
        setTitle("User Stats")
        const response = await fetch("http://localhost:3000/home/about", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
            });
        const result = await response.json();
        setLoading(false);
        if (response.status === 200) {
            setContent(result);
            console.log(result);
        }
    }

    const Profile = async () => {
        setTitle("Your Profile")
        const response = await fetch("http://localhost:3000/profile", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
            });
        const result = await response.json();
        if (response.status === 200) {
            setLoading(false);
        }

    }

    const Topic = async (topic) => {
        setTitle("Topic Page")
        const response = await fetch(`http://localhost:3000/topic/${topic}/about`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
            });
        const result = await response.json();
        if (response.status === 200) {
            setLoading(false);
            setContent(result);
        }
    }
    

    React.useEffect(() => {
        (async () => {
            if (props.type === "home") { await Home(); }
            else if (props.type === "profile") { await Profile(); }
            else if (props.type === "topic") { await Topic(props.topic); }
        })();
    }, []);

    if (loading) return <Loading />
    else{
        return(
            <div className="about-sidebar-container">
                <div className="about-sidebar custom">
                    <div className="about-title">
                        <h3>{title}</h3>
                    </div>
                        {props.type === "home"  && <div className="about-content">
                            <h5>Username: {content.username}</h5> 
                            <ul><h5>Topics Followed: {content.topicsFollowed.length}</h5></ul>
                            <ul><h5>Topics Created: {content.topicsCreated.length}</h5></ul>
                            <ul><h5>Posts Created: {content.postsCreated.length}</h5></ul>
                        </div>}
                        {props.type === 'topic' && <div className="about-content">
                            <h5>Topic Name: {content.topicName}</h5>
                            <ul><h5>Topic Description: {content.topicDescription}</h5></ul>
                            <ul><h5>Topic Created: {content.topicCreated}</h5></ul>
                            <ul><h5>Topic Followers: {content.topicFollowers}</h5></ul>
                            <ul><h5>Topic Posts: {content.topicPosts}</h5></ul>
                        </div>}

                    
                </div>
                <div className='about-sidebar'>
    
                </div>
            </div>
        )
    }
}
export default AboutSidebar;