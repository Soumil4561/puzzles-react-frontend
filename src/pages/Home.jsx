import React from "react";
import Pagination from '@mui/material/Pagination';
import TopicSidebar from "../components/TopicSidebar";
import Posts from "../components/Posts";
import { useSelector } from "react-redux";
import { LoadingHome } from "../components/Loading";
import { Button, IconButton } from "@mui/material";

function Home() {
    const [loading, setLoading] = React.useState(true);
    const userID = useSelector(state => state.profile.userID);
    const [user, setUser] = React.useState(null);
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
            setPosts(result.posts);
            setLoading(false);
        }
    } 

    const fetchMorePosts = async () => {
        const response = await fetch(`http://localhost:3000/home`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lastPostIDTime: posts[posts.length - 1].postCreated
            })
        });

        const result = await response.json();
        if (response.status === 200) {
            console.log(result.posts);
        }
    }

    React.useEffect(() => {
        (async () => {
            await getUser();
        })();
    }, []);


    if (loading) {
        return <LoadingHome />
    } else {
        return (<>
            <div className="content-container">
                <TopicSidebar/>
                <div className='posts'>
                <Posts posts={posts} />
                <Button className="load-more" color="primary" onClick={fetchMorePosts}>
                    Load More
                </Button>
                </div>
                
            </div>
        </>
        )
    }
}

export default Home;