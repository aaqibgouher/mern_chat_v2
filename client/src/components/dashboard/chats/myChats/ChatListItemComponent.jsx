import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedChatAction } from "../../../../actions/userActions";
import { useTheme } from "@mui/material/styles";

const ChatListItemComponent = ({ chat }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleChat = (chat) => {
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

  return (
    <ListItemButton onClick={() => handleChat(chat)}>
      <ListItemAvatar>
        <Avatar
          alt="Profile Picture"
          sx={{ backgroundColor: theme.palette.primary.main }}
          src={
            "isGroup" in chat && !chat.isGroup
              ? chat?.toUserId?.profile
              : chat?.groupId?.profileURL
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          "isGroup" in chat && !chat.isGroup
            ? chat?.toUserId?.name
            : chat?.groupId?.name
        }
        secondary={
          "isGroup" in chat && !chat.isGroup
            ? chat?.toUserId?.about
            : chat?.groupId?.description
        }
      />
    </ListItemButton>
  );
};

export default ChatListItemComponent;
