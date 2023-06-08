import React from 'react';
import Skeleton from '@mui/material/Skeleton';

function Loading() {
    return (
        <div className="loading posts-container">
            <Skeleton variant="text" width={600} height={100} />
            <Skeleton variant="rectangular" width={600} height={300} />
            <Skeleton variant="text" width={600} height={100} />
        </div>
    )
}

export default Loading;