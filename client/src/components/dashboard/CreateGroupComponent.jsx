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
  const contactsState = useSelector((state) => state.userReducers.contacts);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const handleCreateGrouop = async (e) => {
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

      // If there are errors, update the state and prevent form submission
      if (Object.keys(errors).length > 0) {
        return;
      }

      console.log("create group");
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
          value={selectedParticipants} // Use state for selected participants
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
              placeholder="Favorites"
            />
          )}
          error={!!errors.selectedParticipants}
          helperText={errors.selectedParticipants}
        />
        <Button
          sx={{ marginTop: "1rem", marginBottom: "1rem" }}
          fullWidth
          variant="contained"
          onClick={handleCreateGrouop}
        >
          Create Group
        </Button>
      </Container>
    </>
  );
};

export default CreateGroupComponent;
