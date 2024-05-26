import { List, ListItemText } from "@mui/material";
import React from "react";
import ChatListItemComponent from "./ChatListItemComponent";
import { useSelector } from "react-redux";

const ChatListComponent = ({ chats, loading }) => {
  const tabState = useSelector((state) => state.helperReducers.activeTab);
  console.log(tabState, "tab state");

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
          <>
            {tabState ? (
              <ListItemText
                primary={`No ${tabState} found`}
                sx={{ marginLeft: "1rem" }}
              />
            ) : (
              ""
            )}
          </>
        )}
      </List>
    </>
  );
};

export default ChatListComponent;
