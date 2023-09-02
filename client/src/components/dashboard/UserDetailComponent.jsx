import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  avatar: {
    margin: "0 auto",
  },
  userInfo: {
    textAlign: "center",
    marginTop: "16px",
  },
  userDetails: {
    padding: "16px",
  },
}));

const UserDetailComponent = () => {
  const userDetails = useSelector((state) => state.userReducers.me);

  const classes = useStyles();

  return (
    <>
      <div className={classes.userInfo}>
        <Avatar
          alt="User Profile"
          className={classes.avatar}
          sx={{ width: "10rem", height: "10rem" }}
        >
          {/* User Profile Picture */}
        </Avatar>
        <Typography variant="h6">
          {userDetails && userDetails.name ? userDetails.name : "Name"}
        </Typography>
        <Typography variant="body2">
          {userDetails && userDetails.email
            ? userDetails.email
            : "email@gmail.com"}
        </Typography>
      </div>
      {/* <Divider /> */}
      <List className={classes.userDetails}>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary="Name"
            secondary={userDetails && userDetails.name ? userDetails.name : ""}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText
            primary="Email"
            secondary={
              userDetails && userDetails.email ? userDetails.email : ""
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Phone"
            secondary={
              userDetails && userDetails.phone
                ? userDetails.phone
                : "+91 33232****"
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Username"
            secondary={
              userDetails && userDetails.userName ? userDetails.userName : ""
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText
            primary="About"
            secondary={
              userDetails && userDetails.about
                ? userDetails.about
                : "Hello there, I am using Chatiaoo !"
            }
          />
        </ListItem>
      </List>
    </>
  );
};

export default UserDetailComponent;
