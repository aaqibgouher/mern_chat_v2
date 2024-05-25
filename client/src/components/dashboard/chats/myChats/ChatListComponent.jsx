import { List, ListItemText } from "@mui/material";
import React from "react";
import ChatListItemComponent from "./ChatListItemComponent";

const ChatListComponent = ({ chats }) => {
  return (
    <>
      <List sx={{ mb: 2 }}>
        {chats.length ? (
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
