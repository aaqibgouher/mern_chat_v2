import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Fab,
  Badge,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      userName: "AG",
      message: "Hey",
      time: "12:13",
    },
    {
      id: 1,
      userName: "SA",
      message: "Hello",
      time: "12:14",
    },
    {
      id: 1,
      userName: "AG",
      message: "How are you?",
      time: "12:15",
    },
    {
      id: 1,
      userName: "SA",
      message: "How are you?",
      time: "12:15",
    },
    {
      id: 1,
      userName: "AG",
      message: "How are you?",
      time: "12:15",
    },
    {
      id: 1,
      userName: "SA",
      message: "How are you?",
      time: "12:15",
    },
    {
      id: 1,
      userName: "AG",
      message: "How are you?",
      time: "12:15",
    },
    {
      id: 1,
      userName: "AG",
      message: "How are you? I am good, what about you?  how you doing ?",
      time: "12:15",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("AG");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <>
      <Container style={{ height: "40rem", overflow: "auto" }}>
        <Box>
          {messages.map((msg, key) => (
            <div>
              <div
                key={key}
                className={`message-container ${
                  msg.userName === userName
                    ? "sent-message"
                    : "received-message"
                }`}
              >
                <Avatar sx={{ bgcolor: "#1976d2" }}>{msg.userName}</Avatar>
                <p style={{ margin: "0 5px" }}>{msg.message}</p>
              </div>
              <p
                variant="body2"
                className={
                  msg.userName === userName
                    ? "margin-send-time"
                    : "margin-receive-time"
                }
              >
                {msg.time}{" "}
              </p>
            </div>
          ))}
        </Box>
      </Container>
      <Container
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Type here ..."
          variant="outlined"
        />
        <Fab
          color="primary"
          aria-label="send"
          sx={{
            borderRadius: "50%",
            width: 56,
            height: 56,
            margin: "auto",
            marginLeft: "5px",
          }}
        >
          <SendIcon />
        </Fab>
      </Container>
    </>
  );
};

export default ChatContainer;
