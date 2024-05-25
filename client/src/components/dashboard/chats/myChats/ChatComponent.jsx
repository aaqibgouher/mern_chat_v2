import React, { useEffect, useState } from "react";
import { Paper, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchChatsAction } from "../../../../actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatAction } from "../../../../actions/userActions";
import TabsComponent from "../tabs/TabsComponent";
import ChatListComponent from "./ChatListComponent";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const chatsState = useSelector((state) => state.chatReducers.chats);
  const tabState = useSelector((state) => state.helperReducers.activeTab);

  const [chats, setChats] = useState([]);

  const getChats = async () => {
    const payload = {
      type: tabState,
      search: "",
    };
    await dispatch(fetchChatsAction(payload));
  };

  useEffect(() => {
    if (tabState) {
      getChats();
    }
  }, [tabState]);

  useEffect(() => {
    setChats(chatsState);
  }, [chatsState]);

  return (
    <Paper
      square
      sx={{ pb: "50px" }}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      {/* Start: Tabs */}
      <TabsComponent />
      {/* End: Tabs */}

      {/* Start: Search */}
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
      {/* End: Search */}

      {/* Start: Contacts Listing */}
      <ChatListComponent chats={chats} />
      {/* End: Contacts Listing */}
    </Paper>
  );
};

export default ChatComponent;
