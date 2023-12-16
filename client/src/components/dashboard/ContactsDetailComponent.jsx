import React, { useEffect, useState } from "react";
import {
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  ListItem,
  TextField,
  InputAdornment,
  Container,
  Stack,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { fetchChatsAction } from "../../actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserInContactAction,
  fetchContactsAction,
} from "../../actions/userActions";
import DoneIcon from "@mui/icons-material/Done";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const ContactsDetailComponent = () => {
  const dispatch = useDispatch();
  const contactsState = useSelector((state) => state.userReducers.contacts);
  const [contacts, setContacts] = useState([]);
  const theme = useTheme();

  const getContacts = async () => {
    console.log("calling contacts");
    await dispatch(fetchContactsAction());
    console.log(contactsState, "chats from state");
  };

  const addContact = async (toContactId) => {
    try {
      const res = await dispatch(
        addUserInContactAction({ to_user_id: toContactId })
      );

      if (res.status !== 200)
        throw "Something went wrong while add user to contact";

      // refresh the search list
      await getContacts();

      // refresh chats list
      await dispatch(fetchChatsAction());
    } catch (error) {
      console.log(error, "from add contact");
    }
  };

  useEffect(() => {
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
              <ListItem>
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
                <Stack direction="row" spacing={1}>
                  {contact.isConnected ? (
                    <Chip
                      label="Added"
                      color="success"
                      variant="outlined"
                      size="small"
                      avatar={<DoneIcon />}
                    />
                  ) : (
                    <Chip
                      label="Add"
                      color="success"
                      variant="outlined"
                      size="small"
                      onClick={() => addContact(contact._id)}
                      avatar={<PersonAddIcon />}
                    />
                  )}
                </Stack>
              </ListItem>
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
