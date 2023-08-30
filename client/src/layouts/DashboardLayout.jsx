import React from "react";
import {
  CssBaseline,
  AppBar,
  List,
  ListItem,
  ListItemText,
  styled,
  Grid,
  Paper,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import NavbarComponent from "../components/helper/NavbarComponent";
import ChatNavbarComponent from "../components/helper/ChatNavbarComponent";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import ChatComponent from "../components/dashboard/ChatComponent";

const chats = [];
// const chats = [
//   {
//     id: 1,
//     primary: "Rahul",
//     secondary: "I'll be in the neighbourhood this week.",
//     person: "/static/images/avatar/5.jpg",
//   },
//   {
//     id: 2,
//     primary: "Seema",
//     secondary: `I'll be in the neighbourhood this week.`,
//     person: "/static/images/avatar/1.jpg",
//   },
//   {
//     id: 3,
//     primary: "Riya",
//     secondary: "I'll be in the neighbourhood this week.",
//     person: "/static/images/avatar/2.jpg",
//   },
//   {
//     id: 4,
//     primary: "Hassen",
//     secondary: "I'll be in the neighbourhood this week.",
//     person: "/static/images/avatar/3.jpg",
//   },
//   {
//     id: 5,
//     primary: "Raju",
//     secondary: "I'll be in the neighbourhood this week.",
//     person: "/static/images/avatar/4.jpg",
//   },
//   {
//     id: 6,
//     primary: "ALfaaz",
//     secondary: `I'll be in the neighbourhood this week.`,
//     person: "/static/images/avatar/5.jpg",
//   },
//   {
//     id: 7,
//     primary: "Rahmaan",
//     secondary: `I'll be in the neighbourhood this week.`,
//     person: "/static/images/avatar/1.jpg",
//   },
//   {
//     id: 8,
//     primary: "Sifat",
//     secondary: `I'll be in the neighbourhood this week.`,
//     person: "/static/images/avatar/1.jpg",
//   },
//   {
//     id: 9,
//     primary: "Deepak",
//     secondary: `I'll be in the neighbourhood this week.`,
//     person: "/static/images/avatar/1.jpg",
//   },
//   {
//     id: 10,
//     primary: "Kumar",
//     secondary: `I'll be in the neighbourhood this week.`,
//     person: "/static/images/avatar/1.jpg",
//   },
//   {
//     id: 11,
//     primary: "Summer BBQ",
//     secondary: `I'll be in the neighbourhood this week.`,
//     person: "/static/images/avatar/1.jpg",
//   },
//   {
//     id: 12,
//     primary: "Summer BBQ",
//     secondary: `I'll be in the neighbourhood this week.`,
//     person: "/static/images/avatar/1.jpg",
//   },
// ];

const ContentContainer = styled("div")({
  display: "flex",
  height: "100vh", // Full viewport height
  overflow: "hidden", // Hide overflow from the body
});

const DashboardLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <div>
      <CssBaseline />
      <ContentContainer>
        <Grid container spacing={0}>
          {/* Chat Sidebar (4 columns) */}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <NavbarComponent />
            <ChatComponent />
          </Grid>

          {/* Message Content Area (8 columns) */}
          <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
            <ChatNavbarComponent />
            {children}
          </Grid>
        </Grid>
      </ContentContainer>
    </div>
  );
};

export default DashboardLayout;
