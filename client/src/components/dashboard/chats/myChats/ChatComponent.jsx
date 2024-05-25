import React, { useCallback, useEffect, useState } from "react";
import { Paper, TextField, InputAdornment, IconButton } from "@mui/material";
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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getChats = async () => {
    // creating payload
    const payload = {
      type: tabState,
      search,
    };

    // show skeleton
    setLoading(true);

    // call contacts api
    await dispatch(fetchChatsAction(payload));

    // show skeleton for 1 sec
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };

  useEffect(() => {
    console.log(search, "search");
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
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={getChats}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Search in your contacts ..."
        sx={{ padding: "1rem" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* End: Search */}

      {/* Start: Contacts Listing */}
      <ChatListComponent chats={chats} loading={loading} />
      {/* End: Contacts Listing */}
    </Paper>
  );
};

export default ChatComponent;
