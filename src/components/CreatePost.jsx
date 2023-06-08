import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateIcon from '@mui/icons-material/Create';
import { Fab } from '@mui/material';
import { SearchBar } from "./Navbar";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';

function CreatePost(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        const postTopic = document.getElementById("create-post-topic").value;
        const postTitle = document.getElementById("post-title").value;
        const postContent = document.getElementById("post-content").value;
        console.log(postTopic, postTitle, postContent);
        setOpen(false);
    };
    return (
        <div className="create-post">
            <Fab sx={{ height: "50px", width: "50px" }} color="primary" aria-label="add" onClick={handleClickOpen}>
                <CreateIcon sx={{ fontSize: "2rem" }} />
            </Fab>
            <Dialog className="create-post-container"
                PaperProps={{
                    style: {
                        backgroundColor: "#071a2e",
                        color: "#ffffff",
                        width: "100%",
                        height: "100%",
                    }
                }}
                open={open} onClose={handleClose}>
                <DialogTitle>Create Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className="create-post-body">
                        <div className="create-post-topic">
                                <Select
                                    sx={{ 
                                        width: "50%", 
                                        backgroundColor: "#071a2e", 
                                        color: "#ffffff",
                                        borderColor: "#ffffff"
                                        }
                                    }
                                    labelId="select-topic"
                                    id="create-post-topic"
                                    label="Topic"
                                    defaultValue={props.topic || ""}
                                    
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </div>
                            <div className="create-post-title">
                                <SearchBar fullWidth id="post-title" label="Post Title" variant="outlined" />
                            </div>
                            <div className="create-post-content">
                                <SearchBar fullWidth id="post-content" label="Post Content" variant="outlined" multiline rows={6} maxRows={6} />
                            </div>
                            
                            <div className="create-post-image">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AttachFileIcon sx={{color:"#ffffff"}}/>
                                </IconButton>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Post</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreatePost;