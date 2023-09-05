import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  ListItemButton,
  ListItemAvatar,
  ListItemSecondaryAction, // Import ListItemSecondaryAction
  IconButton, // Import IconButton
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../../assets/profile.avif";
import { useTheme } from "@mui/material/styles";
import { showDrawer } from "../../actions/helperActions";

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

const UserContactDetailComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state) => state.userReducers.selectedContactDetail
  );
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [participants, setParticipants] = useState([]);

  const classes = useStyles();

  const handleAddParticipant = (type) => {
    console.log("type", type);
    dispatch(showDrawer(type));
  };

  const handleParticipantDetail = (participant, type) => {
    console.log(participant, type, "from new");
  };

  useEffect(() => {
    if (userDetails) {
      if ("group" in userDetails) {
        setProfile(userDetails.group.profileURL);
        setName(userDetails.group.name);
        setAbout(userDetails.description);
        setIsGroup(true);
        setParticipants(userDetails.groupMembersData);
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
        <Avatar
          alt="User Profile"
          className={classes.avatar}
          src={profile || ProfilePicture}
          sx={{ width: "10rem", height: "10rem" }}
        />
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
      {/* participants list only for group */}
      {isGroup ? (
        <>
          <Divider />
          <Typography
            variant="h6"
            sx={{ marginLeft: "1rem", marginTop: "1rem" }}
          >
            Participants
          </Typography>
          <List sx={{ mb: 2 }}>
            <React.Fragment>
              <ListItemButton
                onClick={() => handleAddParticipant("contactsDetail")}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Profile Picture"
                    sx={{ backgroundColor: theme.palette.primary.main }}
                    src="https://www.freeiconspng.com/uploads/meeting-icon-png-presentation-icon-board-meeting-icon-meeting-icon--4.png"
                  />
                </ListItemAvatar>
                <p>Add participant</p>
              </ListItemButton>
            </React.Fragment>
            {participants.length ? (
              participants.map((participant, index) => (
                <React.Fragment key={index}>
                  <ListItemButton
                    onClick={() =>
                      handleParticipantDetail(participant, "userContactDetail")
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Profile Picture"
                        sx={{ backgroundColor: theme.palette.primary.main }}
                        src={participant.addedTo.profile || ProfilePicture}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={participant.addedTo.name || "Test name"}
                      secondary={participant.addedTo.about || "Test about"}
                    />

                    {/* show chip when group admin */}
                    {participant.isGroupAdmin ? (
                      <Chip label="Admin" color="success" variant="outlined" />
                    ) : (
                      ""
                    )}
                  </ListItemButton>
                </React.Fragment>
              ))
            ) : (
              <ListItemText primary="No chats" sx={{ marginLeft: "1rem" }} />
            )}
          </List>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UserContactDetailComponent;
