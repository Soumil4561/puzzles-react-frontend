import React from 'react';
import { useSelector } from 'react-redux';
import '../stylesheets/Register.css';
import ExtensionIcon from '@mui/icons-material/Extension';
import GoogleButton from 'react-google-button';
import { Divider, Link } from '@mui/material';
import { TextField, Button } from '@mui/material';

const Register = () => {
    const loggedIn = useSelector((state) => state.profile.loggedIn);
    const [username, setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleCreate = async () => {
        if (username === '' || password === '' || email === '' || confirmPassword === '') {
            alert("Please fill out all fields.");
            return;
        }

        const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Confirm password field do not match password field.");
            return;
        }

        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            })
        });

        if (response.status === 200) {
            const result = await response.json();
            console.log(result);
            if(result.success) {
                window.location.href = '/register/setup';
            }
        } else {
            alert("An error occurred while creating your account. Please try again.");
        }
    }

    const handleGoogleSignUp = async () => {
        window.open('http://localhost:3000/auth/google', '_self');
        // const response = await fetch('http://localhost:3000/auth/google', {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        // });
    }        

    React.useEffect(() => {
        if(loggedIn) {
            alert("It seems there is already an account logged in. Please log out to register a new account.");
            window.location.href = '/home';
        }
    }, [loggedIn]);

    return (<>
        <div className='register-container'>
            <div className='register-form-container'>
                <div className='register-logo'>
                    <ExtensionIcon  />
                    <h1>Puzzles</h1>
                </div>
                <div className='register-caption'>
                    Create an account to start posting!
                </div>
                <div className='register-google'>
                    <GoogleButton  onClick={handleGoogleSignUp}/> 
                </div>
                <div className='or'>
                    <Divider>or</Divider>
                </div>
                <div className='register-form'>
                    <TextField required id="email" label="Email" variant="standard" onChange={handleEmail}/>
                    <TextField required id="username" label="Username" variant="standard" onChange={handleUsername}/>
                    <TextField required id="password" label="Password" variant="standard" type='password' onChange={handlePassword}/>
                    <TextField required id="confirm-password" label="Confirm Password" variant="standard" type='password' onChange={handleConfirmPassword}/>
                    <Button variant="contained" onClick={handleCreate}>Get Started</Button>
                </div>
                <div className='register-login'>
                    Already have an account? <Link color='inherit' href='/login'>Log In</Link>
                </div>

            </div>
            <div className='register-image-container'>
                <img src='https://wallpaperaccess.com/full/6173053.jpg' alt='random-pic'/>
            </div>
        </div>
    </>
    )
}

export default Register;