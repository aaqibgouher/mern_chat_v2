import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Chip,
  Container,
  IconButton,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import ProfilePicture from "../../assets/profile.avif";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { hideDialog } from "../../actions/helperActions";
import AddParticipantListComponent from "../dashboard/AddParticipantListComponent";

const users = [
  { id: 1, name: "First" },
  { id: 2, name: "Second" },
  { id: 3, name: "Third" },
  { id: 4, name: "Fourth" },
  { id: 5, name: "Fifth" },
  { id: 6, name: "Sixth" },
  { id: 7, name: "Seventh" },
];

const DialogComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const showDialogState = useSelector(
    (state) => state.helperReducers.showDialog
  );
  const dialogTypeState = useSelector(
    (state) => state.helperReducers.dialogType
  );

  const closeDialog = async () => {
    dispatch(hideDialog());
  };

  return (
    <Dialog open={showDialogState} fullWidth maxWidth="xs">
      <DialogTitle>
        <div style={{ display: "flex", alignItems: "center" }}>
          Add Participants
          {/* Spacer */}
          <div style={{ flex: 1 }} />
          <IconButton onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent style={{ maxHeight: "500px", overflowY: "auto" }}>
        {dialogTypeState === "addParticipant" && (
          <AddParticipantListComponent />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
