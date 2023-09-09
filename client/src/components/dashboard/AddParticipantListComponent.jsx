import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Chip,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ProfilePicture from "../../assets/profile.avif";
import { useTheme } from "@emotion/react";
import {
  fetchContactDetailAction,
  fetchContactsAction,
} from "../../actions/userActions";
import { addParticipantToGroupAction } from "../../actions/chatActions";

const users = [
  { id: 1, name: "First" },
  { id: 2, name: "Second" },
  { id: 3, name: "Third" },
  { id: 4, name: "Fourth" },
  { id: 5, name: "Fifth" },
  { id: 6, name: "Sixth" },
  { id: 7, name: "Seventh" },
];

const AddParticipantListComponent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const contactsState = useSelector((state) => state.userReducers.contacts);
  const groupDetailState = useSelector(
    (state) => state.userReducers.selectedContactDetail
  );
  const selectedChatState = useSelector(
    (state) => state.userReducers.selectedChat
  );
  const [contacts, setContacts] = useState([]);

  const addMemberToGroup = async (user) => {
    try {
      const res = await dispatch(
        addParticipantToGroupAction({
          addUserId: user._id || "",
          groupId: groupDetailState.group._id || "",
        })
      );

      if (res.hasOwnProperty("status") && res.status !== 200) throw res;

      // participant added, refresh the contact detail lists to show added participant
      await dispatch(fetchContactDetailAction(selectedChatState));

      console.log(res, "from res");
    } catch (error) {
      console.log(error, "from add member to group");
    }
  };

  const getContacts = async () => {
    console.log("calling contacts");
    await dispatch(fetchContactsAction());
    console.log(contactsState, "chats from state");
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    setContacts(contactsState);
  }, [contactsState]);

  return (
    <List>
      {contacts.map((user, index) => (
        <React.Fragment key={index}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                alt="Profile Picture"
                sx={{ backgroundColor: theme.palette.primary.main }}
                src={user.profile || ProfilePicture}
              />
            </ListItemAvatar>
            <ListItemText
              primary={user.name || "Test name"}
              secondary={user.about || "Test about"}
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
  );
};

export default AddParticipantListComponent;
