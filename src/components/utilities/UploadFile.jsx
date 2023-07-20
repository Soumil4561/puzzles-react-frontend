import React from 'react';
import { Button, Dialog, DialogTitle, IconButton, Tooltip } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';


const UploadFile = (props) => {
    const [ImageTag, setImageTag] = useState(props.title);
    const [imageLoading, setImageLoading] = useState(0);

    const handleImage = (event) => {
        setImageTag(event.target.files[0].name);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadstart = () => {
            setImageLoading(reader.readyState);
        }
        reader.onload = () => {
            props.handleImage(reader.result);
        }
        reader.onloadend = () => {
            setImageLoading(reader.readyState);
        }
    }

    const handleRemove = () => {
        props.handleImage(null);
        setImageTag(props.title);
    }

    return (
        <div className='upload-file-button'>
        <Tooltip title={props.title} placement="bottom">
            <Button color="inherit" variant='contained' aria-label="upload picture" component="label"
            sx={{
                "display": "flex",
                "flex-direction": "row",
                "justify-content": "space-between",
            }}>
                {ImageTag}
                <input type="file" accept="image/*" onChange={handleImage} hidden/>
                
            </Button>
        </Tooltip>
        {imageLoading !==0 &&
            <IconButton aria-label="remove picture" component="span" onClick={handleRemove}>
                { imageLoading === 1 ? <CircularProgress size={20} /> : <RemoveCircleIcon /> }
            </IconButton>
        }
        </div>
    )
}

export default UploadFile;