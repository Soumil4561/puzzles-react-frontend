import React from "react";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";

function TopicSidebar() {
    const userID = useSelector((state) => state.userID);
    const [topics, setTopics] = React.useState([]);

    const getTopics = async () => {
        const response = await fetch(`http://localhost:3000/topic/getUserFollowedTopics`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();
        if (response.status === 200) {
            console.log(result.topics);
            setTopics(result.topics);
        }
    }

    React.useEffect(() => {
        (async () => {
            await getTopics();
        })();
    }, [userID]);

    return (
        <div className="topic-sidebar">
            <div className="sidebar-header">
                <h2>Followed Topics</h2>
            </div>
            <div className="sidebar-topics">
                <Stack spacing={0} sx={{ width: "100%" }}>
                    {topics.map((topic, index) => {
                        return (<>
                            <Link href={"/topic/" + topic.topicName} underline="hover" color='inherit' key={index}>
                            <div className="sidebar-topic" key={index}>
                                <Avatar className="sidebar-avatar" alt={topic.topicName} src={topic.topicPhoto}>{topic.topicName.charAt(0)}</Avatar>
                                <h4>{topic.topicName}</h4>
                            </div>
                            </Link>
                            <Divider />
                        </>

                        )
                    })}
                </Stack>
            </div>

        </div>
    )
}

export default TopicSidebar;