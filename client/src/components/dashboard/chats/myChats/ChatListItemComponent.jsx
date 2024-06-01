import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatAction } from "../../../../actions/userActions";
import { useTheme } from "@mui/material/styles";
import { formatRelativeTime } from "../../../../utils/common";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ImageIcon from "@mui/icons-material/Image";
import DoneAllIcon from "@mui/icons-material/DoneAll";

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

  console.log(chat, "chat *****");

  const renderPrimaryText = (chat) => {
    const name =
      chat && "isGroup" in chat && !chat?.isGroup
        ? chat?.toUserId?.name
        : chat?.groupId?.name;

    const date = chat?.latestMessage?.createdAt
      ? formatRelativeTime(chat?.latestMessage?.createdAt)
      : "";

    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{name}</span>
        <Typography variant="caption" color="textSecondary">
          {date}
        </Typography>
      </div>
    );
  };

  const renderSecondaryText = (chat) => {
    if (!chat?.isGroup) {
      const latestMessage = chat?.latestMessage;
      if (latestMessage) {
        switch (latestMessage.type) {
          case "text":
            return (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DoneAllIcon fontSize="small" sx={{ marginRight: "5px" }} />
                  <span>{latestMessage.message}</span>
                </Box>
              </>
            );
          case "video":
            return (
              <span>
                <VideoLibraryIcon fontSize="small" /> Video
              </span>
            );
          case "image":
            return (
              <span>
                <ImageIcon fontSize="small" /> Image
              </span>
            );
          default:
            return latestMessage.message;
        }
      }
    } else {
      return chat?.groupId?.description;
    }
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
            primary={renderPrimaryText(chat)}
            secondary={renderSecondaryText(chat)}
          />
        </ListItemButton>
      )}
    </>
  );
};

export default ChatListItemComponent;
