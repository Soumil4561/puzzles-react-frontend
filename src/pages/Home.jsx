import React from "react";
import Navbar from "../components/Navbar";
import TopicSidebar from "../components/TopicSidebar";
import Posts from "../components/Posts";
import { useLocation } from "react-router-dom";

function Home() {
    const user = useLocation().state;
    console.log(user);
    return (<>
        <Navbar profilePhoto={user.profilePhoto} />
        <div className="content-container">
            <TopicSidebar topicsFollowed={user.topicsFollowed} />
            <Posts />
        </div>
    </>
    )
}

export default Home;