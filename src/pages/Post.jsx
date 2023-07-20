import React from 'react';
import { useParams } from 'react-router-dom';
import "../stylesheets/Post.css";
import { Fab, IconButton, Stack } from '@mui/material';
import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import SearchBar from '../components/utilities/StyledTextField';
import PostComments from '../components/Comments';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumpDownIcon from '@mui/icons-material/ThumbDown';
import ThumpDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
function Post() {
    const postID = useParams().postID;
    const [loading, setLoading] = React.useState(true);
    const [post, setPost] = React.useState(null);
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState("");
    const [liked, setLiked] = React.useState(false);
    const [disliked, setDisliked] = React.useState(false);
    const [numLikes, setNumLikes] = React.useState(0);
    const [numDislikes, setNumDislikes] = React.useState(0);
    const [saved, setSaved] = React.useState(false);
    const loggedIn = useSelector((state) => state.profile.loggedIn);


    const handlePostAction = async (event) => {
        if(loggedIn){
            const action = event.currentTarget.getAttribute("aria-label");
            const response = await fetch("http://localhost:3000/post/${postID}/function", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json",},
                    body: JSON.stringify({
                        postID: postID,
                        type: action
                    })
            });
            const result = await response.json();
            if (action === "like"){
                if (!liked){
                    if (response.status === 200){
                        setLiked(true);
                        setNumLikes(numLikes + 1);
                        if (disliked){
                            setDisliked(false);
                            setNumDislikes(numDislikes - 1);
                        }
                    }
                }
                else{
                    if (response.status === 200){
                        setLiked(false);
                        setNumLikes(numLikes - 1);
                    }
                }
            }
            else if (action === "dislike"){
                if(!disliked){
                    if (response.status === 200){
                        setDisliked(true);
                        setNumDislikes(numDislikes + 1);
                        if (liked){
                            setLiked(false);
                            setNumLikes(numLikes - 1);
                        }
                    }
                }
                else{
                    if (response.status === 200){
                        setDisliked(false);
                        setNumDislikes(numDislikes - 1);
                    }
                }
            }
            else if (action === "save"){
                if(response.status === 200){
                    setSaved(result.saved);
                }
            }
        }
        else{
            alert("You must be logged in to do that!");
        }
    }

    const handleComment = async () => {
        if(loggedIn && comment !== ""){
            const response = await fetch("http://localhost:3000/utility/createComment", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json",},
                        body: JSON.stringify({
                            commentContent: comment,
                            commentPost: postID
                        })
                });
                const result = await response.json();
                if (response.status === 200){
                    setComments([...comments, result]);
                    setComment("");
                }
        }
        else{
            alert("You must be logged in to do that!");
        }
    }


    const getPost = async () => {
        const response = await fetch(`http://127.0.0.1:3000/post/${postID}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });
        const result = await response.json();
        if (response.status === 200) {
            setPost(result.post);
            setComments(result.comments);
            setNumLikes(result.post.likes);
            setNumDislikes(result.post.dislikes);
            setLoading(false);
        }
    }

    const getUserPostInfo = async () => {
        if(loggedIn){
            const response = await fetch("http://localhost:3000/post/${postID}/user", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            console.log(result);
            if (response.status === 200) {
                setLiked(result.liked);
                setDisliked(result.disliked);
                setSaved(result.saved);
            }
        }
    }


    React.useEffect(() => {
        (async () => {
            await getPost();
            await getUserPostInfo();
        })();
    }, []);

    if (loading) return <div>Loading...</div>

    return (
        <>
            <div className="page-container">
                <Stack spacing={2}>
                    <div className="post-container">
                        <Card sx={{
                            width: "100%",
                            backgroundColor: "var(--secondary-color)",
                            color: "var(--primary-text-color)",
                        }}>
                            <CardHeader
                                title={post.postTitle}
                                subheader={"by " + post.postCreatorName}
                                subheaderTypographyProps={{ color: 'white' }}
                            />
                            {/* <img src={post.postImageFile} alt='post image' /> */}
                            {post.postImageFile !== null ? <CardMedia
                                component="img"
                                height="10%"
                                image={post.postImageFile}
                                alt="post image"
                            /> : null}
                            <CardContent>
                                {post.postContent}
                            </CardContent>
                            <CardActions className="post-button">
                                <Button aria-label="like" onClick={handlePostAction}>
                                    {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                                    <h4>{numLikes}</h4>
                                </Button>
                                <Button aria-label="dislike" onClick={handlePostAction}>
                                    {disliked ? <ThumpDownIcon /> : <ThumpDownOffAltIcon />}
                                    <h4>{numDislikes}</h4>
                                </Button>
                                <Button aria-label="save" onClick={handlePostAction}>
                                    {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                    <h4>{saved ? "Saved" : "Save"}</h4>
                                </Button>
                                <Button aria-label="share">
                                    <ShareIcon />
                                    <h4>Share</h4>
                                </Button>
                            </CardActions>
                        </Card>
                    </div>

                    <div className="comment-input-container">
                            <div className="comment-box-descriptor">
                                <h2>Comment</h2>
                            </div>
                            <SearchBar
                                id="outlined-multiline-static"
                                label="Share your thoughts..."
                                multiline
                                rows={6}
                                sx={{ width: '95%', margin: '0 2.5%' }}
                                variant="outlined"
                                onChange={(event) => setComment(event.target.value)}
                            />
                            <div className="comment-button-container">
                            <Fab size="small" sx={{color:"var(--tertiary-color", zIndex: "0"}} aria-label="add" onClick={handleComment}>
                                <AddIcon />
                            </Fab>
                                </div>
                    </div>
                    <div className="comments-container">
                        <h2>Comments:</h2>
                        <Stack spacing={2}>
                            {comments.map((comment, index) => {
                                return (
                                    <PostComments
                                        key={index}
                                        commentID={comment.commentID}
                                        commentCreatorName={comment.commentCreatorName}
                                        commentCreated={comment.commentCreated}
                                        commentContent={comment.commentContent}
                                        commentLikes={comment.commentLikes}
                                        commentDislikes={comment.commentDislikes}
                                    />
                                )
                            })}
                        </Stack>
                    </div>
                </Stack>
                
            <footer>
                <h1>bye</h1>
            </footer>
            </div>
        </>
    )
}

export default Post;