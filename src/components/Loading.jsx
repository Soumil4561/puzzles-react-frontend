import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import "../stylesheets/Topic.css";

function LoadingHome() {
    return (
        <>
        <div className="content-container">
            <div className="topic-sidebar">
                <Skeleton variant="rectangular" width={300} height={500}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" width={40} height={40} />
                    <Skeleton variant="rectangular" width={300} height={200} />
                </Skeleton>
            </div>

            <div className="posts-container">
                <div className="posts">
                    <Skeleton variant="rectangular" width={600} height={200} />
                    <Skeleton variant="rectangular" width={600} height={200} />
                    <Skeleton variant="rectangular" width={600} height={200} />
                </div>
            </div>
        </div>
        </>
    )
}

function LoadingTopic() {
    return (
        <>
        <div className="topic-container">
            <div className="topic-banner">
                <Skeleton variant="rectangular" fullWidth height={200} />
            </div>
            <div className="topic-info">
                <Skeleton variant="text" width={500} height={50} />
                <Skeleton variant="text" width={500} height={50} />
            </div>
            <div className="content-container">
                <div className="posts-container">
                    <div className="posts">
                        <Skeleton variant="rectangular" width={600} height={200} />
                        <Skeleton variant="rectangular" width={600} height={200} />
                        <Skeleton variant="rectangular" width={600} height={200} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoadingHome;
export {LoadingHome, LoadingTopic};