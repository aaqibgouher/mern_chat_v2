import React, { useState } from "react";
import { TextField, Container, Box, Avatar, Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import registerImage from "../../assets/register.jpg";
import { useTheme } from "@mui/material/styles";

const ChatContainer = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      userName: "AG",
      message: "Hiii",
      time: "12:20",
    },
    {
      id: 2,
      userName: "SA",
      message: "Hello",
      time: "12:21",
    },
    {
      id: 3,
      userName: "AG",
      message: "Good",
      time: "12:22",
    },
    {
      id: 4,
      userName: "SA",
      message: "Yes",
      time: "12:23",
    },
    {
      id: 1,
      userName: "AG",
      message: "Hiii",
      time: "12:20",
    },
    {
      id: 2,
      userName: "SA",
      message: "Hello",
      time: "12:21",
    },
    {
      id: 3,
      userName: "AG",
      message: "Good",
      time: "12:22",
    },
    {
      id: 4,
      userName: "SA",
      message: "Yes",
      time: "12:23",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("AG");

  return (
    <>
      <Container
        style={{
          height: "40rem",
          overflow: "auto",
          marginTop: "1rem",
        }}
      >
        <Box>
          {messages.length === 0 ? (
            <div className="no-message-container">
              <img src={registerImage} alt="No messages" />
            </div>
          ) : (
            messages.map((msg, key) => (
              <div>
                <div
                  key={key}
                  className={`message-container ${
                    msg.userName === userName
                      ? "sent-message"
                      : "received-message"
                  }`}
                >
                  <Avatar
                    style={{ backgroundColor: theme.palette.primary.main }}
                  >
                    {msg.userName}
                  </Avatar>
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
            ))
          )}
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
          placeholder="Type here ..."
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
