import React, { useState } from "react";
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import GoogleIcon from '@mui/icons-material/Google';
import {  useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Login() {
    const [cookies] = useCookies();
    const checksession = async () => {
        const response = await fetch("http://localhost:3000/auth/checksession", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });
        const result = await response.json();
        console.log(result);
        if (result.success) {
            navigate("/home", { state: result.userID });
        }}
        
    React.useEffect(() => {
        (async () => {
            if(cookies) await checksession();
        })();
    }, []);

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const CatchUsername = (event) => {
        setUsername(event.target.value);
    }

    const CatchPassword = (event) => {
        setPassword(event.target.value);
    }

    const Submit = async () => {
        if (username === "" || password === "") {
            <Alert severity="error">Please fill all the fields</Alert>
        }
        const data = {
            username: username,
            password: password
        }

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
            navigate("/home",{state: result.userID});
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