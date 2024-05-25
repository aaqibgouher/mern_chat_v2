import { List, ListItemText } from "@mui/material";
import React from "react";
import ChatListItemComponent from "./ChatListItemComponent";

const ChatListComponent = ({ chats, loading }) => {
  return (
    <>
      <List sx={{ mb: 2 }}>
        {loading ? (
          // Render skeletons while loading
          Array.from(new Array(5)).map((_, index) => (
            <ChatListItemComponent loading key={index} />
          ))
        ) : chats.length ? (
          chats.map((chat, index) => (
            <ChatListItemComponent chat={chat} key={index} />
          ))
        ) : (
          <ListItemText primary="No chats" sx={{ marginLeft: "1rem" }} />
        )}
      </List>
    </>
  );
};

export default ChatListComponent;
