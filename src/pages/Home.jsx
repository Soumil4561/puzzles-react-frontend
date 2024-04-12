import React from "react";
import TopicSidebar from "../components/TopicSidebar";
import Posts from "../components/Posts";
import { LoadingHome } from "../components/Loading";
import { Button } from "@mui/material";
import AboutSidebar from "../components/AboutSidebar";

function Home() {
    const [loading, setLoading] = React.useState(true);
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
                <div className="right-sidebar">
                    <AboutSidebar type="home"/>
                </div>
            </div>
            
        </>
        )
    }
}

export default Home;