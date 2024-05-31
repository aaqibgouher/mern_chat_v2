import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  Container,
  Box,
  Avatar,
  Fab,
  Chip,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LottieNoMessageAnimationComponent from "../../helper/LottieNoMessageAnimationComponent";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAction } from "../../../actions/chatActions";
import { FETCH_MESSAGES } from "../../../actionTypes/chatActionTypes";
import MessageListComponent from "./MessageListComponent";

const MessageComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const messagesState = useSelector((state) => state.chatReducers.messages);
  const meState = useSelector((state) => state.userReducers.me);
  const selectedContactDetailState = useSelector(
    (state) => state.userReducers.selectedContactDetail
  );
  const selectedChatState = useSelector(
    (state) => state.userReducers.selectedChat
  );
  const socketState = useSelector((state) => state.userReducers.socket);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("text");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    try {
      const payload = {
        fromUserId: meState._id || "",
        toContactId: selectedChatState.profileId || "",
        message,
        type,
        isGroup: selectedChatState.isGroup || false,
      };
      socketState.emit("send_message", payload);
    } catch (error) {
      console.log(error, "from send message component");
    }
  };

  useEffect(() => {
    console.log("use called", messagesState);
    setMessages([]);
    // setLoading(true);
    if (messagesState && messagesState.length) {
      const formattedMessages = messagesState.map((message) => ({
        id: message?._id,
        fromUserId: message?.fromUserId?._id,
        toUserId:
          "group" in selectedContactDetailState
            ? message?.toGroupId
            : message?.toUserId._id,
        message: message?.message,
        fromUserName: message?.fromUserId?.name?.slice(0, 2),
        createdAt: message.createdAt,
      }));
      console.log(formattedMessages, "formatted ****");
      setMessages(formattedMessages);
    }
  }, [messagesState]);

  useEffect(() => {
    console.log(messagesState, "message state");
    const handleReceiveMessage = async (data) => {
      console.log(data, "from socket");
      // setMessages((prev) => [...prev, data]);
      console.log(messagesState, "from state xxxx");
      dispatch({ type: FETCH_MESSAGES, payload: [...messagesState, data] });
      setMessage("");
      // await dispatch({
      //   type: FETCH_MESSAGES,
      //   payload: [...messagesState, data],
      // });
    };

    socketState.on("receive_message", handleReceiveMessage);

    return () => {
      socketState.off("receive_message", handleReceiveMessage);
    };
  }, [socketState, dispatch, messagesState]);

  useEffect(() => {
    if (selectedChatState) {
      setLoading(true);

      // show skeleton for 1 sec
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
    }
  }, [selectedChatState]);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        height: "91vh",
      }}
    >
      <Box
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieNoMessageAnimationComponent />
          </div>
        ) : (
          <MessageListComponent messages={messages} loading={loading} />
        )}
      </Box>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          placeholder="Type here ..."
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Fab
          color="primary"
          aria-label="send"
          sx={{
            borderRadius: "50%",
            width: 56,
            height: 56,
            marginLeft: "5px",
          }}
          onClick={sendMessage}
        >
          <SendIcon />
        </Fab>
      </Container>
    </Container>
  );
};

export default MessageComponent;
