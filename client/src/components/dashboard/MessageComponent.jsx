// import React, { useEffect, useState } from "react";
// import { TextField, Container, Box, Avatar, Fab } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import registerImage from "../../assets/register.jpg";
// import { useTheme } from "@mui/material/styles";
// import LottieAnimationMessageComponent from "../helper/LottieAnimationMessageComponent";
// import { useDispatch, useSelector } from "react-redux";
// import LottieNoMessageAnimationComponent from "../helper/LottieNoMessageAnimationComponent";
// import { sendMessageAction } from "../../actions/chatActions";

// const MessageComponent = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const messagesState = useSelector((state) => state.chatReducers.messages);
//   const meState = useSelector((state) => state.userReducers.me);
//   const selectedContactDetailState = useSelector(
//     (state) => state.userReducers.selectedContactDetail
//   );
//   const selectedChatState = useSelector(
//     (state) => state.userReducers.selectedChat
//   );
//   const socketState = useSelector((state) => state.userReducers.socket);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [type, setType] = useState("text");

//   const sendMessage = async () => {
//     try {
//       // SOCKET
//       const payload = {
//         fromUserId: meState._id || "",
//         toContactId: selectedChatState.profileId || "",
//         message,
//         type,
//         isGroup: selectedChatState.isGroup || false,
//       };
//       // emit the event
//       socketState.emit("send_message", payload);
//     } catch (error) {
//       console.log(error, "from send message component");
//     }
//   };

//   useEffect(() => {
//     console.log("called use");
//     setMessages([]);
//     if (messagesState.length) {
//       // if group then else solo
//       if ("group" in selectedContactDetailState) {
//         console.log("group message");
//         const formattedMessages = messagesState.map((message) => ({
//           id: message._id,
//           fromUserId: message.fromUserId._id,
//           toUserId: message.toGroupId,
//           message: message.message,
//           fromUserName: message.fromUserId.name.slice(0, 2),
//           time: "12:23",
//         }));

//         console.log(formattedMessages, "formatted group");
//         setMessages(formattedMessages);
//       } else {
//         console.log("solo message");
//         const formattedMessages = messagesState.map((message) => ({
//           id: message._id,
//           fromUserId: message.fromUserId._id,
//           toUserId: message.toUserId._id,
//           message: message.message,
//           fromUserName: message.fromUserId.name.slice(0, 2),
//           time: "12:23",
//         }));

//         console.log(formattedMessages, "formatted solo");
//         setMessages(formattedMessages);
//       }
//     }
//   }, [messagesState]);

//   useEffect(() => {
//     console.log(messages, "messages");
//   }, [messages]);

//   useEffect(() => {
//     console.log(socketState, "scoket state");

//     const handleReceiveMessage = (data) => {
//       setMessages((prev) => [...prev, data]);
//       setMessage("");
//     };

//     socketState.on("receive_message", handleReceiveMessage);

//     return () => {
//       // Unsubscribe from the socket event when the component unmounts
//       socketState.off("receive_message", handleReceiveMessage);
//     };
//   }, [socketState]);

//   return (
//     <>
//       <Container
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           height: "100vh",
//         }}
//       >
//         <Box
//           style={{
//             flex: 1,
//             overflowY: "auto",
//             padding: "1rem",
//           }}
//         >
//           {messages.length === 0 ? (
//             <div className="no-message-container">
//               <LottieNoMessageAnimationComponent />
//             </div>
//           ) : (
//             messages.map((msg, key) => (
//               <div key={key}>
//                 <div
//                   className={`message-container ${
//                     msg.fromUserId === meState._id
//                       ? "sent-message"
//                       : "received-message"
//                   }`}
//                 >
//                   <Avatar
//                     style={{ backgroundColor: theme.palette.primary.main }}
//                   >
//                     {msg.fromUserName}
//                   </Avatar>
//                   <p style={{ margin: "0 5px" }}>{msg.message}</p>
//                 </div>
//                 <p
//                   variant="body2"
//                   className={
//                     msg.fromUserId === meState._id
//                       ? "margin-send-time"
//                       : "margin-receive-time"
//                   }
//                 >
//                   {msg.time}{" "}
//                 </p>
//               </div>
//             ))
//           )}
//         </Box>
//       </Container>
//       <Container
//         style={{
//           position: "sticky",
//           top: 0,
//           display: "flex",
//         }}
//       >
//         <TextField
//           fullWidth
//           id="outlined-basic"
//           placeholder="Type here ..."
//           variant="outlined"
//           onChange={(e) => setMessage(e.target.value)}
//           value={message}
//         />
//         <Fab
//           color="primary"
//           aria-label="send"
//           sx={{
//             borderRadius: "50%",
//             width: 56,
//             height: 56,
//             margin: "auto",
//             marginLeft: "5px",
//           }}
//           onClick={sendMessage}
//         >
//           <SendIcon />
//         </Fab>
//       </Container>
//     </>
//   );
// };

// export default MessageComponent;

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
import LottieNoMessageAnimationComponent from "../helper/LottieNoMessageAnimationComponent";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAction } from "../../actions/chatActions";
import { FETCH_MESSAGES } from "../../actionTypes/chatActionTypes";

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
    if (messagesState.length) {
      const formattedMessages = messagesState.map((message) => ({
        id: message._id,
        fromUserId: message.fromUserId._id,
        toUserId:
          "group" in selectedContactDetailState
            ? message.toGroupId
            : message.toUserId._id,
        message: message.message,
        fromUserName: message.fromUserId.name.slice(0, 2),
        time: "12:23",
      }));
      setMessages(formattedMessages);
    }
  }, [messagesState]);

  useEffect(() => {
    const handleReceiveMessage = async (data) => {
      console.log(data, "from socket");
      setMessages((prev) => [...prev, data]);
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
  }, [socketState]);

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
          messages.map((msg, key) => (
            <div key={key}>
              <Grid
                container
                justifyContent={
                  msg.fromUserId === meState._id ? "flex-end" : "flex-start"
                }
                sx={{
                  textAlign: msg.fromUserId === meState._id ? "right" : "left",
                }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{ mb: 1, mr: msg.fromUserId === meState._id ? 0 : 2 }}
                >
                  <Chip
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.text.white,
                        }}
                      >
                        {msg.fromUserName}
                      </Avatar>
                    }
                    label={msg.message}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
              </Grid>
              {/* <div
                className={`message-container ${
                  msg.fromUserId === meState._id
                    ? "sent-message"
                    : "received-message"
                }`}
              >
                <Chip
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.text.white,
                      }}
                    >
                      {msg.fromUserName}
                    </Avatar>
                  }
                  label={msg.message}
                  variant="outlined"
                  size="medium"
                />
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
              </p> */}
            </div>

            // <div key={key}>
            //   <div
            //     className={`message-container ${
            //       msg.fromUserId._id === meState._id
            //         ? "sent-message"
            //         : "received-message"
            //     }`}
            //   >
            //     <Chip
            //       avatar={
            //         <Avatar
            //           style={{
            //             backgroundColor: theme.palette.primary.main,
            //             color: theme.palette.text.white,
            //           }}
            //         >
            //           {msg &&
            //             msg.fromUserId &&
            //             msg.fromUserId.name &&
            //             msg.fromUserId.name.slice(0, 2)}
            //         </Avatar>
            //       }
            //       label={msg.message}
            //       variant="outlined"
            //       size="medium"
            //     />
            //   </div>
            //   {/* <small
            //     variant="body2"
            //     className={
            //       msg.fromUserId === meState._id
            //         ? "margin-send-time"
            //         : "margin-receive-time"
            //     }
            //   >
            //     {msg.time}{" "}
            //   </small> */}
            // </div>
          ))
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
