import React from "react";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Container,
  styled,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SidebarComponent from "../components/helper/SidebarComponent";

const drawerWidth = 240;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerContainer = styled("div")(({ theme }) => ({
  overflow: "auto",
  height: "100%",
}));

// const Sidebar = () => (
//   <Drawer
//     variant="permanent"
//     sx={{
//       width: drawerWidth,
//       flexShrink: 0,
//       [`& .MuiDrawer-paper`]: { width: drawerWidth },
//     }}
//   >
//     <Toolbar />
//     <DrawerContainer>
//       <List>
//         <ListItem button>
//           <ListItemIcon>
//             <InboxIcon />
//           </ListItemIcon>
//           <ListItemText primary="Inbox" />
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon>
//             <MailIcon />
//           </ListItemIcon>
//           <ListItemText primary="Mail" />
//         </ListItem>
//       </List>
//       <Divider />
//       <List>
//         <ListItem button>
//           <ListItemIcon>
//             <InboxIcon />
//           </ListItemIcon>
//           <ListItemText primary="Inbox" />
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon>
//             <MailIcon />
//           </ListItemIcon>
//           <ListItemText primary="Mail" />
//         </ListItem>
//       </List>
//     </DrawerContainer>
//   </Drawer>
// );

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            CHATIYAOO.AI
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <SidebarComponent />
      <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Container>
    </div>
  );
};

export default DashboardLayout;
