import React from "react";
import Navbar from "../components/Navbar";
import TopicSidebar from "../components/TopicSidebar";
import Posts from "../components/Posts";
import { useLocation } from "react-router-dom";

function Home() {
    const [loading, setLoading] = React.useState(true);
    const userID = useLocation().state;

    const [user, setUser] = React.useState(null);
    const [topicsFollowed, setTopicsFollowed] = React.useState([]);
    const [posts, setPosts] = React.useState([]);

    const getUser = async () => {
        const response = await fetch("http://localhost:3000/home", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });
        const result = await response.json();
        if (response.status === 200) {
            setUser(result.user);
            setTopicsFollowed(result.topics); 
            setPosts(result.posts);
            setLoading(false);
            console.log(loading);
        }
    }

    React.useEffect(() => {
        (async () => {
            await getUser();
        })();
    }, []);


    if (loading) {
        return <div>Loading...</div>
    } else {
        return (<>
            <Navbar profilePhoto={user.profilePhoto} username={user.username} />
            <div className="content-container">
                <TopicSidebar topicsFollowed={topicsFollowed} />
                <Posts posts={posts}/>
            </div>
        </>
        )
    }
}

export default Home;