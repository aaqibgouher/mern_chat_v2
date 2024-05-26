import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatAction } from "../../../../actions/userActions";
import { useTheme } from "@mui/material/styles";

const ChatListItemComponent = ({ chat, loading }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const selectedChatState = useSelector(
    (state) => state.userReducers.selectedChat
  );

  const handleChat = (chat) => {
    // check for group or solo chat, then update selectedChat state
    if ("isGroup" in chat && !chat?.isGroup)
      dispatch(
        setSelectedChatAction({ profileId: chat?.toUserId._id, isGroup: false })
      );
    else
      dispatch(
        setSelectedChatAction({ profileId: chat?.groupId._id, isGroup: true })
      );
  };

  return (
    <>
      {loading ? (
        <ListItemButton>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton width="80%" />}
            secondary={<Skeleton width="60%" />}
          />
        </ListItemButton>
      ) : (
        <ListItemButton
          onClick={() => handleChat(chat)}
          selected={
            chat?.isGroup
              ? selectedChatState?.profileId === chat?.groupId?._id
              : selectedChatState?.profileId === chat?.toUserId?._id
          }
        >
          <ListItemAvatar>
            <Avatar
              alt="Profile Picture"
              sx={{ backgroundColor: theme.palette.primary.main }}
              src={
                chat && "isGroup" in chat && !chat?.isGroup
                  ? chat?.toUserId?.profile
                  : chat?.groupId?.profileURL
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              chat && "isGroup" in chat && !chat?.isGroup
                ? chat?.toUserId?.name
                : chat?.groupId?.name
            }
            secondary={
              chat && "isGroup" in chat && !chat?.isGroup
                ? chat?.toUserId?.about
                : chat?.groupId?.description
            }
          />
        </ListItemButton>
      )}
    </>
  );
};

export default ChatListItemComponent;
