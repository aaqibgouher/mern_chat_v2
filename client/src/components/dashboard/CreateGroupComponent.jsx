import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Container,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import { createGroupAction, fetchChatsAction } from "../../actions/chatActions";
import { hideDrawer } from "../../actions/helperActions";
import { setSelectedChatAction } from "../../actions/userActions";
import { FETCH_CONTACT_DETAIL } from "../../actionTypes/userActionTypes";

const useStyles = makeStyles(() => ({
  avatar: {
    margin: "0 auto",
  },
  userInfo: {
    textAlign: "center",
    marginTop: "16px",
  },
  userDetails: {
    padding: "16px",
  },
}));

const CreateGroupComponent = () => {
  const dispatch = useDispatch();
  const contactsState = useSelector((state) => state.userReducers.contacts);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const tabState = useSelector((state) => state.helperReducers.activeTab);

  const handleCreateGroup = async (e) => {
    try {
      e.preventDefault();

      // Validation checks
      const errors = {};
      if (!name) {
        errors.name = "Group name is required";
      }
      if (!description) {
        errors.description = "Group description is required";
      }

      if (selectedParticipants.length === 0) {
        errors.selectedParticipants = "Atleast one participant is required";
      }

      setErrors(errors);

      console.log(errors, "errors");

      // If there are errors, update the state and prevent form submission
      if (Object.keys(errors).length > 0) {
        return;
      }

      const res = await dispatch(
        createGroupAction({
          name,
          description,
          members: selectedParticipants.map((participant) => participant._id),
        })
      );

      if (!res) throw res;

      // close the drawer
      await dispatch(hideDrawer());

      // Payload for chats
      // creating payload
      const payload = {
        type: tabState,
        search: "",
      };

      // refresh chats list
      await dispatch(fetchChatsAction(payload));

      // open created group
      // setting existing selected contact details to null
      dispatch({
        type: FETCH_CONTACT_DETAIL,
        payload: null,
      });

      // setting new created group detail
      await dispatch(
        setSelectedChatAction({ profileId: res.data[0].groupId, isGroup: true })
      );

      console.log("create group", res);
    } catch (error) {
      console.log(error, "from handle creat group");
    }
  };

  // Clear specific error when typing in the corresponding field
  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  useEffect(() => {
    setParticipants(contactsState);
    console.log(participants, "participants");
  }, [contactsState]);

  return (
    <>
      <Container>
        <Avatar
          alt="User Profile"
          className={classes.avatar}
          sx={{ width: "10rem", height: "10rem", margin: "1rem auto" }}
        >
          {/* User Profile Picture */}
        </Avatar>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          placeholder="Enter your group name"
          sx={{ marginTop: "1rem" }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError("name");
          }}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Description"
          variant="outlined"
          multiline
          rows={6}
          placeholder="Enter your group description"
          sx={{ marginTop: "1rem" }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearError("description");
          }}
          error={!!errors.description}
          helperText={errors.description}
        />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={contactsState}
          getOptionLabel={(option) => option.name || ""}
          value={selectedParticipants}
          onChange={(_, newValue) => {
            setSelectedParticipants(newValue);
            clearError("selectedParticipants");
          }} // Handle change
          filterSelectedOptions
          sx={{ marginTop: "1rem" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select participants"
              placeholder="Participants"
              error={!!errors.selectedParticipants}
              helperText={errors.selectedParticipants}
            />
          )}
        />
        <Button
          sx={{ marginTop: "1rem", marginBottom: "1rem" }}
          fullWidth
          variant="contained"
          onClick={handleCreateGroup}
        >
          Create Group
        </Button>
      </Container>
    </>
  );
};

export default CreateGroupComponent;
