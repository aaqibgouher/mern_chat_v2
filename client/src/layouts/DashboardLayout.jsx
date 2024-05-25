import React, { useEffect } from "react";
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
import { useTheme } from "@mui/material/styles";
import ChatComponent from "../components/dashboard/chats/myChats/ChatComponent";
import LottieAnimationMessageComponent from "../components/helper/LottieAnimationMessageComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactDetailAction } from "../actions/userActions";
import MessageComponent from "../components/dashboard/MessageComponent";
import {
  fetchGroupMessagesAction,
  fetchMessagesAction,
} from "../actions/chatActions";

const ContentContainer = styled("div")({
  display: "flex",
  height: "100vh", // Full viewport height
  overflow: "hidden", // Hide overflow from the body
});

const DashboardLayout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.userReducers.selectedChat);

  const fetchContactDetail = async () => {
    try {
      await dispatch(fetchContactDetailAction(selectedChat));
    } catch (error) {
      console.log(error, "from fetch contact detail async");
    }
  };

  const fetchMessages = async () => {
    try {
      console.log("called fetch msg", selectedChat);

      if (selectedChat.isGroup) {
        console.log("group called");
        await dispatch(fetchGroupMessagesAction(selectedChat.profileId));
      } else {
        await dispatch(
          fetchMessagesAction({
            toUserId: selectedChat.profileId,
            isGroup: selectedChat.isGroup,
          })
        );
      }
    } catch (error) {
      console.log(error, "from fetch message -> dashboard layout");
    }
  };

  useEffect(() => {
    if (selectedChat) {
      console.log(selectedChat, "called selected");
      fetchContactDetail();
      fetchMessages();
    }
  }, [selectedChat]);

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
            {selectedChat ? (
              <>
                <ChatNavbarComponent />
                <MessageComponent />
              </>
            ) : (
              <div className="no-message-container">
                <LottieAnimationMessageComponent />
              </div>
            )}
          </Grid>
        </Grid>
      </ContentContainer>
    </div>
  );
};

export default DashboardLayout;
