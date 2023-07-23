import React from "react";
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import SaveIcon from '@mui/icons-material/Save';
import Loading from "./Loading";
import Error from "./Error";
import { CardActionArea } from "@mui/material";
import Link from "@mui/material/Link"
import DateTimeParser from "./utilities/datetimeparser";


const post = {
    width: "100%",
    backgroundColor: "var(--secondary-color)",
    color: "#ffffff",
}

const PostButton = (props) => {
    var Button;
    if (props.type === "like") Button = <ThumbUpIcon color="primary" />
    else if (props.type === "dislike") Button = <ThumbDownIcon color="primary" />
    else if (props.type === "comment") Button = <CommentIcon color="primary" />
    else Button = <SaveIcon color="primary" />
    return (<>
        <IconButton aria-label={props.type}>
            {Button}
        </IconButton>
        <h6>{props.value}</h6>
    </>

    )
}

function Post(props) {
    return (
        
        <Card className="post" sx={post}>
            <div className="post-describers">
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Link href={"/topic/"+props.topic} color='inherit' underline='hover'>
                            <h6>Topic: {props.topic}</h6>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <h6>Author: {props.author}</h6>
                    </Grid>
                    <Grid item xs={2}>
                        <h6>Date: {props.date}</h6>
                    </Grid>
                    <Grid item xs={2}>
                        <h6>Time:{props.time}</h6>
                    </Grid>
                </Grid>
            </div>
            <CardActionArea onClick={() => { console.log(props.postID);
                window.location.href = `/posts/${props.postID}`;
            }}>
            <div className="post-title">
                <CardHeader 
                    title={props.title}
                />
            </div>
            <div className="post-media">
                {
                    props.photo ? <CardMedia
                    component="img"
                    image={props.photo}
                    alt="Paella dish"
                /> : <CardContent>
                    {props.description}
                </CardContent>
                }
            </div>
            </CardActionArea>
            <CardActions>
                <PostButton type="like" value={props.likes} />
                <PostButton type="dislike" value={props.dislikes} />
                <PostButton type="comment" value="Comment" />
                <PostButton type="save" value="Save" />
            </CardActions>
        </Card>
    )
}

function Posts(props) {
    const [posts, setPosts] = React.useState(props.posts);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            if (loading) {
                try {
                    setPosts(props.posts);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    setError(error);
                    console.log(error);
                }
            }
        })();
    }, []);

    if (loading) return <Loading />
    if (error) {
        console.log(error);
        return <Error />
    }

    return (
        <div className="posts-container">
            <Stack spacing={1}>
                {posts.map((post, index) => {
                    const {date,time} = DateTimeParser(post.postCreated);
                    return (<>
                        <Post
                            key={index}
                            postID={post._id}
                            title={post.postTitle}
                            description={post.postContent}
                            date={date}
                            time={time}
                            author={post.postCreatorName}
                            topic={post.postTopic}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            photo={post.postImageFile} />
                    </>
                    )
                })}
            </Stack>
        </div>
    )
}

export default Posts;