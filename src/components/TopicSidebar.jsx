import React from "react";
import Input from '@mui/joy/Input';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

function TopicSidebar(props) {
    const topics = props.topicsFollowed;
    return (
        <div className="topic-sidebar">
            <div className="sidebar-header">
                <h2>Followed Topics</h2>
            </div>
            <div className="sidebar-search">
                <Input placeholder="Search" />
            </div>
            <div className="sidebar-topics">
                <Stack spacing={0} sx={{ width: "100%" }}>
                    {topics.map((topic, index) => {
                        return (<>
                            <div className="sidebar-topic" key={index}>
                                <Avatar className="sidebar-avatar" alt={topic.topicName} src={topic.topicPhoto}>{topic.topicName.charAt(0)}</Avatar>
                                <h4>{topic.topicName}</h4>
                            </div>
                        </>

                        )
                    })}
                </Stack>
            </div>

        </div>
    )
}

export default TopicSidebar;