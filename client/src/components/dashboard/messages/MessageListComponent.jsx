import { useTheme } from "@mui/material/styles";
import MessageListItemComponent from "./MessageListItemComponent";
import { useEffect, useRef } from "react";

const MessageListComponent = ({ messages, loading }) => {
  const theme = useTheme();

  return (
    <>
      {messages.map((msg, index) => (
        <MessageListItemComponent msg={msg} key={index} loading={loading} />
      ))}
    </>
  );
};

export default MessageListComponent;
