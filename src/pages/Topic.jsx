import React from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';


function Topic() {
    const [loading, setLoading] = React.useState(true);
    const [topic, setTopic] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const topicName = useParams().topicName;

    return(
        <></>
    )

}

export default Topic;