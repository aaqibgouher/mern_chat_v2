import React, { useEffect, useState } from "react";
import {
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  TextField,
  InputAdornment,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { fetchChatsAction } from "../../actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsAction } from "../../actions/userActions";

const ContactsDetailComponent = () => {
  const dispatch = useDispatch();
  const contactsState = useSelector((state) => state.userReducers.contacts);
  const [contacts, setContacts] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const getContacts = async () => {
      console.log("calling contacts");
      dispatch(fetchContactsAction());
      console.log(contactsState, "chats from state");
    };

    getContacts();
  }, []);

  useEffect(() => {
    setContacts(contactsState);
  }, [contactsState]);

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search in your contacts ..."
        sx={{ padding: "1rem", position: "sticky", top: 0, display: "flex" }}
      />

      <List sx={{ mb: 2 }}>
        {contacts.length ? (
          contacts.map((contact, index) => (
            <React.Fragment key={index}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt="Profile Picture"
                    sx={{ backgroundColor: theme.palette.primary.main }}
                    src={contact.profile}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={contact.name}
                  secondary={contact.about}
                />
              </ListItemButton>
            </React.Fragment>
          ))
        ) : (
          <ListItemText primary="No contacts" sx={{ marginLeft: "1rem" }} />
        )}
      </List>
    </>
  );
};

export default ContactsDetailComponent;
