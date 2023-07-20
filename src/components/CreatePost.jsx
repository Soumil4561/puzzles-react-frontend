import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateIcon from '@mui/icons-material/Create';
import { Button, Fab, Tooltip } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import SearchBar from './utilities/StyledTextField';
import Autocomplete from "@mui/material/Autocomplete";


function CreatePost() {
    const [open, setOpen] = React.useState(false);
    const [topics, setTopics] = React.useState({});
    const [postTopic, setPostTopic] = React.useState("");
    const [postTopicID, setPostTopicID] = React.useState("");
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");
    const [postImage, setPostImage] = React.useState(null);

    const handleClickOpen = async () => {
        setOpen(true);
        const response = await fetch("http://localhost:3000/utility/getTopicList", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        const list = await response.json();
        setTopics(list);

    };

    const handleClose = (event) => {
        setOpen(false);
    };
    
    const createPost = async () => {
        const response = await fetch("http://localhost:3000/post/createPost", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "multipart/form-data"},
            body: JSON.stringify({
                postTopic: postTopic,
                postTopicID: postTopicID,
                postTitle: postTitle,
                postContent: postContent,
                postImageFile: postImage
            })
        });
        if (response.status === 200) {
            const result = await response.json();
            const postID = result.postID;
            console.log(result);
            window.location.href = result.redirect;
    }
       
}

    const handleFile = (event)=>  {
        var formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append('name', 'some value user types');
        formData.append('description', 'some value user types');
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            setPostImage(reader.result);
        }
    }

    return (
        <div className="create-post">
            <Tooltip title="Create Post" aria-label="create-post">
            <Fab sx={{ height: "50px", width: "50px" }} color="primary" aria-label="add" onClick={handleClickOpen}>
                <CreateIcon sx={{ fontSize: "2rem" }} />
            </Fab>
            </Tooltip>
            <Dialog className="create-post-container"
                PaperProps={{
                    style: {
                        backgroundColor: "var(--primary-color)",
                        color: "var(--primary-text-color)",
                        width: "100%",
                        height: "100%",
                    }
                }}
                open={open} onClose={handleClose}>
                <DialogTitle>Create Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form className="create-post-form" encType="multipart/form-data">
                        <div className="create-post-body">
                            <div className="create-post-topic">
                                <Autocomplete
                                    id="create-post-topic"
                                    options={topics}
                                    value={topics.topicName}
                                    onChange={(event, value) => {
                                        setPostTopic(value.topicName);
                                        setPostTopicID(value._id);
                                    }}
                                    getOptionLabel={(option) => option.topicName}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <SearchBar {...params} label="Topic" />}
                                />
                            </div>
                            <div className="create-post-title">
                                <SearchBar onChange={(event) => {setPostTitle(event.target.value);}} 
                                fullWidth id="post-title" label="Post Title" variant="outlined" />
                            </div>
                            <div className="create-post-content">
                                <SearchBar onChange={(event) => {setPostContent(event.target.value);}}
                                fullWidth id="post-content" label="Post Content" variant="outlined" multiline rows={8} />
                            </div>

                            <div className="create-post-image">
                                <Button color="primary" aria-label="upload picture" component="label" >
                                    Upload Image
                                    <input type="file" accept="image/*" onChange={handleFile}/>
                                </Button>
                            </div>
                        </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="create-post-buttons">
                        <div className="add-post">
                        <Button onClick={createPost} color="primary" variant="contained" startIcon={<AddIcon />}>Create Post</Button>
                        </div>
                        <div className="cancel-post">
                        <Button onClick={handleClose} color="primary" variant="contained">Cancel</Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreatePost;