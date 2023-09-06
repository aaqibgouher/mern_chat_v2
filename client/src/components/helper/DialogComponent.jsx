import React, { useState } from "react";
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

const users = [
  { id: 1, name: "Aaqib" },
  { id: 2, name: "Ajay" },
  { id: 3, name: "Gouher" },
  { id: 4, name: "Nazish" },
  { id: 5, name: "Danish" },
  { id: 6, name: "Ashar" },
  { id: 7, name: "Saqib" },
];

const DialogComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const showDialogState = useSelector(
    (state) => state.helperReducers.showDialog
  );

  const addMemberToGroup = async (user) => {
    console.log(user, "from add member");
  };

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
        <List>
          {users.map((user, index) => (
            <React.Fragment key={index}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt="Profile Picture"
                    sx={{ backgroundColor: theme.palette.primary.main }}
                    src={ProfilePicture}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name || "Test name"}
                  secondary="Test about"
                />

                <Chip
                  label="Add"
                  color="success"
                  variant="outlined"
                  onClick={() => addMemberToGroup(user)}
                />
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
