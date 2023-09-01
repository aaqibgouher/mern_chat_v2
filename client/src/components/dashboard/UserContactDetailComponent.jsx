import React, { useEffect, useState } from "react";
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
    width: "200px",
    height: "200px",
    margin: "0 auto",
    marginTop: "16px",
  },
  userInfo: {
    textAlign: "center",
    marginTop: "16px",
  },
  userDetails: {
    padding: "16px",
  },
}));

const UserContactDetailComponent = () => {
  const userDetails = useSelector(
    (state) => state.userReducers.selectedContactDetail
  );
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUsername] = useState("");
  const [about, setAbout] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if (userDetails) {
      if ("group" in userDetails) {
        setProfile(userDetails.group.profileURL);
        setName(userDetails.group.name);
        setAbout(userDetails.description);
      } else {
        setProfile(userDetails.profile);
        setName(userDetails.name);
        setEmail(userDetails.email);
        setPhone(userDetails.phone);
        setUsername(userDetails.userName);
        setAbout(userDetails.about);
      }
    }
  }, [userDetails]);

  return (
    <>
      <div className={classes.userInfo}>
        <Avatar alt="User Profile" className={classes.avatar}>
          {/* User Profile Picture */}
        </Avatar>
        <Typography variant="h6">{name || "Name"}</Typography>
        <Typography variant="body2">{email || "email@gmail.com"}</Typography>
      </div>
      {/* <Divider /> */}
      <List className={classes.userDetails}>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Name" secondary={name || ""} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Email" secondary={email || ""} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary="Phone" secondary={phone || "+91 33232****"} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Username" secondary={userName || ""} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText
            primary="About"
            secondary={about || "Hello there, I am using Chatiaoo !"}
          />
        </ListItem>
      </List>
    </>
  );
};

export default UserContactDetailComponent;
