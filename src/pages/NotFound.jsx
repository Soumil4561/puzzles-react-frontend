import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();
    return (
        <div>
            <img src="../image/NotFound.svg" alt="404" />
        </div>
    )
}

export default NotFound;