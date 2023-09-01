import React, { useEffect, useState } from "react";
import {
  List,
  ListItemText,
  Paper,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { fetchChatsAction } from "../../actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatAction } from "../../actions/userActions";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const chatsState = useSelector((state) => state.chatReducers.chats);

  const [chats, setChats] = useState([]);
  const theme = useTheme();

  const handleChat = (chat) => {
    console.log(chat, "chat");
    // check for group or solo chat
    if ("isGroup" in chat && !chat.isGroup)
      dispatch(
        setSelectedChatAction({ profileId: chat.toUserId._id, isGroup: false })
      );
    else
      dispatch(
        setSelectedChatAction({ profileId: chat.groupId._id, isGroup: true })
      );
  };

  useEffect(() => {
    const getChats = async () => {
      console.log("calling chat");
      dispatch(fetchChatsAction());
      console.log(chatsState, "chats from state");
    };

    getChats();
  }, []);

  useEffect(() => {
    setChats(chatsState);
  }, [chatsState]);

  return (
    <Paper
      square
      sx={{ pb: "50px" }}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <TextField
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search in your contacts ..."
        sx={{ padding: "1rem" }}
      />
      <List sx={{ mb: 2 }}>
        {chats.length ? (
          chats.map((chat, index) => (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => handleChat(chat)}>
                <ListItemAvatar>
                  <Avatar
                    alt="Profile Picture"
                    sx={{ backgroundColor: theme.palette.primary.main }}
                    src={
                      "isGroup" in chat && !chat.isGroup
                        ? chat.toUserId.profile
                        : chat.groupId.profileURL
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    "isGroup" in chat && !chat.isGroup
                      ? chat.toUserId.name
                      : chat.groupId.name
                  }
                  secondary={
                    "isGroup" in chat && !chat.isGroup
                      ? chat.toUserId.about
                      : chat.groupId.description
                  }
                />
              </ListItemButton>
            </React.Fragment>
          ))
        ) : (
          <ListItemText primary="No chats" sx={{ marginLeft: "1rem" }} />
        )}
      </List>
    </Paper>
  );
};

export default ChatComponent;
