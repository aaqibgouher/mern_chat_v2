import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom>
        Chat
      </Typography>
      <List style={{ flex: 1, maxHeight: 'calc(100% - 120px)', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Type your message"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={handleSendMessage}>
        Send
      </Button>
    </Paper>
  );
};

export default ChatContainer;
