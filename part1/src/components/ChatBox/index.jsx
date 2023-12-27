import React, { useEffect, useState } from "react";
import { Stack, TextField, Typography, Button, Paper } from "@mui/material";
import api from "../../Services/service";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    api.getEventMessages(1).then((res) => {
      setMessages(res.data);
    });
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    try {
      const res = await api.createEventMessage(1, value);
      if (res.status === 200) {
        const timestamp = new Date().toLocaleTimeString();
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: value, timestamp: timestamp },
        ]);
        setValue(""); // Clear the text field after sending the message
      }
    } catch (error) {
      // Handle error if needed
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Paper elevation={3} sx={{ padding: "16px", borderRadius: "8px", height: "400px", overflow: "hidden" }}>
      

      <Stack height="100%" justifyContent="flex-end" spacing={2}>
        <Stack flex={1} overflow="auto" spacing={2}>
          {messages.map((msg, index) => (
            <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
              <Paper elevation={2} sx={{ padding: "8px", borderRadius: "8px", backgroundColor: "#f0f0f0" }}>
                <Typography>{msg.message}</Typography>
              </Paper>
              <Typography variant="caption" color="text.secondary">
                {msg.timestamp}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            fullWidth
            value={value}
            onChange={handleChange}
            variant="outlined"
            label="Type a message"
          />
          <Button variant="contained" onClick={sendMessage} disabled={!value}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ChatBox;
