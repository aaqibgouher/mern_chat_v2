import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
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
import { hideUserDetailDrawer } from "../../actions/helperActions";

const useStyles = makeStyles(() => ({
  drawer: {
    width: 400,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 400,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "8px",
  },
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

const UserDetailDrawerComponent = () => {
  const userDetailDrawer = useSelector(
    (state) => state.helperReducers.userDetailDrawer
  );
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleDrawerClose = () => {
    dispatch(hideUserDetailDrawer());
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={userDetailDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={handleDrawerClose}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.userInfo}>
          <Avatar alt="User Profile" className={classes.avatar}>
            {/* User Profile Picture */}
          </Avatar>
          <Typography variant="h6">John Doe</Typography>
          <Typography variant="body2">john.doe@example.com</Typography>
        </div>
        {/* <Divider /> */}
        <List className={classes.userDetails}>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Name" secondary="John Doe" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" secondary="john.doe@example.com" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary="+1234567890" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Username" secondary="johndoe" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              primary="About"
              secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac suscipit justo."
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default UserDetailDrawerComponent;
