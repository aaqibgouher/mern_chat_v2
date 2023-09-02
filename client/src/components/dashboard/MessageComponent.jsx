import React, { useEffect, useState } from "react";
import { TextField, Container, Box, Avatar, Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import registerImage from "../../assets/register.jpg";
import { useTheme } from "@mui/material/styles";
import LottieAnimationMessageComponent from "../helper/LottieAnimationMessageComponent";
import { useSelector } from "react-redux";
import LottieNoMessageAnimationComponent from "../helper/LottieNoMessageAnimationComponent";

const MessageComponent = () => {
  const theme = useTheme();
  const messagesState = useSelector((state) => state.chatReducers.messages);
  const meState = useSelector((state) => state.userReducers.me);
  const selectedContactDetailState = useSelector(
    (state) => state.userReducers.selectedContactDetail
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("called use");
    setMessages([]);
    if (messagesState.length) {
      // if group then else solo
      if ("group" in selectedContactDetailState) {
        console.log("group message");
        const formattedMessages = messagesState.map((message) => ({
          id: message._id,
          fromUserId: message.fromUserId._id,
          toUserId: message.toGroupId,
          message: message.message,
          fromUserName: message.fromUserId.name.slice(0, 2),
          time: "12:23",
        }));

        console.log(formattedMessages, "formatted group");
        setMessages(formattedMessages);
      } else {
        console.log("solo message");
        const formattedMessages = messagesState.map((message) => ({
          id: message._id,
          fromUserId: message.fromUserId._id,
          toUserId: message.toUserId._id,
          message: message.message,
          fromUserName: message.fromUserId.name.slice(0, 2),
          time: "12:23",
        }));

        console.log(formattedMessages, "formatted solo");
        setMessages(formattedMessages);
      }
    }
  }, [messagesState]);

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
              <LottieNoMessageAnimationComponent />
            </div>
          ) : (
            messages.map((msg, key) => (
              <div key={key}>
                <div
                  className={`message-container ${
                    msg.fromUserId === meState._id
                      ? "sent-message"
                      : "received-message"
                  }`}
                >
                  <Avatar
                    style={{ backgroundColor: theme.palette.primary.main }}
                  >
                    {msg.fromUserName}
                  </Avatar>
                  <p style={{ margin: "0 5px" }}>{msg.message}</p>
                </div>
                <p
                  variant="body2"
                  className={
                    msg.fromUserId === meState._id
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

export default MessageComponent;
