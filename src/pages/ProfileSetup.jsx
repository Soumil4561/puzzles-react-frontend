import React from 'react';
import { useSelector } from 'react-redux';
import { Stepper, Step, StepLabel, Avatar, Button, Box, FormControl } from '@mui/material';
import '../stylesheets/ProfileSetup.css';
import UploadFile from '../components/utilities/UploadFile';
import SearchBar from '../components/utilities/StyledTextField';
import { Checkbox, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';


const steps = ['Profile Photo' , 'Topics', 'Finish'];

const ProfileSetup = () => {
    const username = useSelector((state) => state.profile.username);
    const [topics, setTopics] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [photo, setPhoto] = React.useState(null);
    const [topicList, setTopicList] = React.useState([]);

    const handlePhoto = (props) => {
        setPhoto(props);
    }

    const clearPhoto = () => {
        setPhoto(null);
    }

    try{
        document.getElementsByClassName('navbar-container')[0].style.display = 'none';
    }
    catch(err){
        console.log(err);
    }

    const ProfilePhoto = () => {
        return (
            <div className="steps-container">
                <div className="container-header">
                    Profile Photo
                </div>
                <div className="container-body">
                    <div className="photo-container">
                        <Avatar sx={{ "width": "100%", "height": "100%" }} alt={username} src={photo} />
                    </div>
                    <div className="photo-input">
                        <UploadFile handleImage={handlePhoto} title="Upload Profile Photo"/>
                        <div className='remove-file-button'>
                            <Button  color='inherit' variant='contained' aria-label="upload picture" component="label" onClick={clearPhoto}>Remove</Button>
                        </div>
        
                    </div>
                </div>
            </div>
        )
    }

    const Topics = async () => {
        const response = await fetch("http://localhost:3000/utility/getTopicList", {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"}
        });

        const data = await response.json();
        if(data.success){
            setTopicList(data.topics);
        }
        else{
            console.log(data.message);
        }

        return (
            <div className="steps-container">
                <div className="container-header">
                    Topics
                </div>
                <div className="container-body">
                    <div className="topics-container">
                        {/* <Box sx={{ width: '50%' }}>
                        <FormControl required error={'dude come on'} sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormLabel component="legend">Choose Topics</FormLabel>
                            <FormGroup>
                                {topicList.map((topic ) => (
                                    <FormControlLabel key={topic} control={<Checkbox />} label={topic} />
                                ))}
                            </FormGroup>
                            <FormHelperText>Be careful</FormHelperText>
                        </FormControl>
                        </Box> */}
                    </div>
                </div>
            </div>
        )
    }

    const Finish = () => {
        return (
            <>
                <h2>Finish</h2>
            </>
        )
    }


    
    
    return (
        <>
            <div className="setup-container">
                <div className="setup-header">
                    Profile Setup
                </div>
                <div className='stepper-container'>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <div className="setup-body">
                    {activeStep === 0 && <ProfilePhoto/>}
                    {activeStep === 1 && <Topics/>}
                    {activeStep === 2 && <Finish/>}
                </div>
                <div className='setup-buttons'>
                    <Button color="inherit" disabled={activeStep === 0} onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}>Back</Button>
                    <Button color="inherit" disabled={activeStep === steps.length - 1} onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}>Next</Button>
                </div>

            </div>
        </>
    )
}

export default ProfileSetup