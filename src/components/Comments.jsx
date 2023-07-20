import React from 'react';
import {Card, CardHeader, CardContent, CardActions} from '@mui/material';
import {Avatar} from '@mui/material';
import {Button} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumpDownIcon from '@mui/icons-material/ThumbDown';
import ThumpDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
//import ReplyIcon from '@mui/icons-material/Reply';
import { useSelector } from 'react-redux';

function PostComments(props) {
    const [commentLikes, setCommentLikes] = React.useState(props.commentLikes);
    const [commentDislikes, setCommentDislikes] = React.useState(props.commentDislikes);
    const [commentLiked, setCommentLiked] = React.useState(false);
    const [commentDisliked, setCommentDisliked] = React.useState(false);
    const loggedIn = useSelector((state) => state.profile.loggedIn);

    const handleCommentAction = async(event) => {
        const action = event.currentTarget.getAttribute('aria-label');
        if(loggedIn){
            const response = await fetch('http://localhost:3000/utility/comment',{
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: action,
                    commentId: props.commentID
                })
            });
            if(response.status === 200){
                if(action === 'like'){
                    setCommentLikes(commentLikes + 1);
                    setCommentLiked(true);
                    if(commentDisliked){
                        setCommentDislikes(commentDislikes - 1);
                        setCommentDisliked(false);
                    }
                }
                else if(action === 'dislike'){
                    setCommentDislikes(commentDislikes + 1);
                    setCommentDisliked(true);
                    if(commentLiked){
                        setCommentLikes(commentLikes - 1);
                        setCommentLiked(false);
                    }
                }

            }
        }
    }

    return (
        <div className="comment-body">
            {console.log(props)}
            <Card sx={{
                        width: "98%",
                        margin: "0 1%",
                        alignItems: "center",
                        backgroundColor: "var(--primary-color)",
                        color: "var(--primary-text-color)"
                    }}
            >
                <CardHeader
                    sx={{
                        padding: "2% 4%"
                    }}
                    avatar={
                        <Avatar>
                            {props.commentCreatorName[0]}
                        </Avatar>
                    }
                    title={props.commentCreatorName}
                    subheader={props.commentCreated}
                    subheaderTypographyProps={{ color: 'white' }}
                />
                <CardContent sx={{
                    padding: "1% 4%"
                }}>
                    {props.commentContent}
                </CardContent>
                <CardActions className="post-button disabled">
                                <Button size="small" aria-label="like" className="disabled" onClick={handleCommentAction}>
                                    {commentLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                                    <h4>{props.commentLikes}</h4>
                                </Button>
                                <Button aria-label="dislike" className='disabled' onClick={handleCommentAction}>
                                    {commentDisliked ? <ThumpDownIcon /> : <ThumpDownOffAltIcon />}
                                    <h4>{props.commentDislikes}</h4>
                                </Button>
                                {/* <Button aria-label="reply" className='disabled'>
                                    <ReplyIcon />
                                </Button> */}
                            </CardActions>
            </Card>
        </div>
    )
}

export default PostComments;