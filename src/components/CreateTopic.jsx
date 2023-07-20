import { Button, Dialog } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import SearchBar from './utilities/StyledTextField';
import UploadFile from './utilities/UploadFile';


function CreateTopic() {
    const [open, setOpen] = React.useState(false);
    const [topicName, setTopicName] = React.useState("");
    const [topicDescription, setTopicDescription] = React.useState("");
    const [topicImage, setTopicImage] = React.useState(null);
    const [topicBanner, setTopicBanner] = React.useState(null);

    const handleImage = (props) => {
        setTopicImage(props);
    }
    const handleBanner = (props) => {
        setTopicBanner(props);
    }

    const handleChange = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCreate = async () => {
        const response = await fetch("http://localhost:3000/topic/createTopic", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "multipart/form-data"},
            body: JSON.stringify({
                topicName: topicName,
                topicDescription: topicDescription,
                topicPhoto: topicImage,
                topicBanner: topicBanner
            })
        });
        if(response.status === 200) {
            setOpen(false);
            const result = await response.json();
            window.location.href = `/topic/${result.topicName}`
        }

    }

    return (
        <div className="create-topic">
            <Button variant="contained" color="inherit" onClick={handleChange} startIcon={<AddIcon fontSize='large'/>}>Create Topic</Button>
            <Dialog className='create-topic-container'
            PaperProps={{
                    style: {
                        backgroundColor: "var(--primary-color)",
                        color: "var(--primary-text-color)",
                        width: "100%",
                        height: "100%",
                    }
                }}
                open={open} onClose={handleClose}>
                <DialogTitle>Create Topic</DialogTitle>
                <DialogContent>
                    <div className="create-topic-body">
                        <div className="create-topic-name">
                            <SearchBar onChange={(event) => {setTopicName(event.target.value);}}
                            fullWidth id="topic-name" label="Topic Name" variant="outlined" />
                    </div>
                    <div className="create-topic-description">
                        <SearchBar onChange={(event) => {setTopicDescription(event.target.value);}}
                        fullWidth id="topic-description" label="Topic Description" variant="outlined" multiline rows={8} />
                    </div>
                    <div className="create-topic-image">
                        <UploadFile handleImage={handleImage} title=" Upload Topic Picture " />
                        <UploadFile handleImage={handleBanner} title=" Upload Topic Banner " />
                    </div>
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateTopic;