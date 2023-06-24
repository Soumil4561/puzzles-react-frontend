import React, { useState } from "react";
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import GoogleIcon from '@mui/icons-material/Google';
import {  useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/profileSlicer";

function Login() {

    const loggedIn = useSelector(state => state.loggedIn);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (loggedIn) {
            navigate("/home");
        }
    }, [loggedIn]);

    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const CatchUsername = (event) => {
        setUsername(event.target.value);
    }

    const CatchPassword = (event) => {
        setPassword(event.target.value);
    }

    const dispatch = useDispatch();

    const Submit = async () => {
        if (username === "" || password === "") {
            <Alert severity="error">Please fill all the fields</Alert>
        }
        const data = {
            username: username,
            password: password
        }

        //const [cookies, setCookie] = useCookies(['userID', 'username', 'email', 'profilePhoto']);

        const reponse = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await reponse.json();    
        if(result.success){
            console.log(result);
            <Alert severity="success">{result.message}</Alert>
            dispatch(login(result.user));
            navigate("/home");
        }
        else{
            <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
                <Alert severity="error">{result.message}</Alert>
            </Box>
            
        }
    }
    return (<>
        <div className="form-container">
            <form className="form">
                <h1 className="form-title">Login</h1>
                <div className="form-group">
                    <Input onChange={CatchUsername} type="text" id="username" className="form-control" placeholder="Username" />
                    <Input onChange={CatchPassword} type="password" id="password" className="form-control" placeholder="Password" />
                    <Button className="form-btn" onClick={Submit} variant="solid">Login</Button>
                </div>
            </form>
            <h2>Or Login using: </h2>
            <div className="social-container">
                <a href="http://localhost:3000/auth/google" className="social"><GoogleIcon /></a>
            </div>
        </div>
    </>)
}

export default Login;