import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from "react-redux";
import { logout } from "../reducers/profileSlicer";

function ProfileButton(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/auth/logout", {
            method: "DELETE",
            credentials: "include",
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        if(data.success){
            console.log(data);
            dispatch(logout());
            window.location.href = "/";
        }
    };

    return (
        <div className="navbar-profile">
            <Button
                id="basic-button"
                aria-controls="profile-menu"
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                onClick={handleClick}
            >
            <Avatar sx={{ width: 40, height: 40 }} alt={props.username} src={props.profilePhoto} >{props.username.charAt(0)}</Avatar>
            </Button>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <a href="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></a>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default ProfileButton;