import React, { useState } from "react";
import "../stylesheets/Login.css";
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import GoogleIcon from '@mui/icons-material/Google';
import ExtensionIcon from '@mui/icons-material/Extension';

function Login() {

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
            alert("Please fill out all fields.");
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
        if (result.success) {
            console.log(result);
            window.location.href = "/";
        }
        else {
            alert(result.message);
        }
    }

    return (<div className="login-page">

        <div class="custom-shape-divider-top-1687604294">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
            </svg>
        </div>

        <div className="form-container">
            <div className="form-img">
                <img src="https://images.unsplash.com/photo-1586165877141-3dbcfc059283?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="login" />
            </div>
            <form className="form">
            <div className="logo"><ExtensionIcon fontSize="large"/><h1>Puzzles</h1></div>
                <h2 className="form-title">Welcome Back!</h2>
                <div className="form-group">
                    <Input onChange={CatchUsername} type="text" id="username" className="form-control" placeholder="Username" />
                    <Input onChange={CatchPassword} type="password" id="password" className="form-control" placeholder="Password" />
                    <Button sx={{margin:"2% 17.5%"}} className="form-btn" onClick={Submit} variant="solid">Login</Button>
                </div>
                <h2>Or continue with: </h2>
            <div className="social-container">
                <a href="http://localhost:3000/auth/google" className="social"><GoogleIcon /></a>
            </div>
            <h4 className="register-title">Don't have an account? Register here</h4>
            </form>
            
        </div>

        <div class="custom-shape-divider-bottom-1687604434">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
            </svg>
        </div>
    </div>)
}

export default Login;