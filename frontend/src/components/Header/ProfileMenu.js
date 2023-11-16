import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import useAuth from "../../hooks/useAuth";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'
import "./styles.css";


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const auth = useAuth()
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('user')
    navigate("/")
    
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="profile-menu-flex"
      >
        <MenuRoundedIcon />
        <AccountCircleRoundedIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiPaper-root": {
            minWidth: "200px",
            borderRadius: "1rem",
            boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
          },
        }}
      >
        {auth ? <MenuItem  style={{color:'red'}} onClick={logOut} className="menu-items">
          <LogoutIcon/>
          Logout
        </MenuItem> : <div>
        <MenuItem className="menu-items" onClick={() => navigate("/register")}>
          Signup
        </MenuItem>
        <MenuItem onClick={() => navigate("/login")} className="menu-items">
          Login
        </MenuItem>
        </div>  }
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--grey)",
            width: "100%",
          }}
        />
        <MenuItem onClick={handleClose} className="menu-items">
          Airbnb Your Home
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-items">
          Host an experience
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-items">
          Help
        </MenuItem>
      </Menu>
    </div>
  );
}
