import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Toolbar,
  styled,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const DrawerContainer = styled("div")(({ theme }) => ({
  overflow: "auto",
}));

const SidebarComponent = () => {
  const users = [
    {
      name: "User 1",
      profilePicture: "link-to-profile-pic-1",
    },
    {
      name: "User 2",
      profilePicture: "link-to-profile-pic-2",
    },
    {
      name: "User 2",
      profilePicture: "link-to-profile-pic-2",
    },
    {
      name: "User 2",
      profilePicture: "link-to-profile-pic-2",
    },
    {
      name: "User 2",
      profilePicture: "link-to-profile-pic-2",
    },
    {
      name: "User 2",
      profilePicture: "link-to-profile-pic-2",
    },

    // Add more users here
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth },
      }}
    >
      <Toolbar />
      <DrawerContainer>
        <List>
          {users.map((user) => (
            <ListItem button key={user.name}>
              <ListItemIcon>
                <Avatar src={user.profilePicture} />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </DrawerContainer>
    </Drawer>
  );
};

export default SidebarComponent;
