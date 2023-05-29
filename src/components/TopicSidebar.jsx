import React from "react";
import Input from '@mui/joy/Input';
import Stack from '@mui/material/Stack';


function TopicSidebar(props){
     const topics = props.topicsFollowed;
    return(
        <div className="topic-sidebar">
            <div className="sidebar-header">
                <h2>Followed Topics</h2>
            </div>
            <div className="sidebar-search">
                <Input placeholder="Search"/>
            </div>
            <div className="sidebar-topics">
                <Stack spacing={0} sx={{width: "100%"}}>
                    {topics.map((topic) => {
                        return(
                            <div className="sidebar-topic">
                                <h4>{topic}</h4>
                            </div>
                        )
                    })}
                </Stack>
            </div>

        </div>
    )
}

export default TopicSidebar;