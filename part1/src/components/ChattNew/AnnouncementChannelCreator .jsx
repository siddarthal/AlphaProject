import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import api from "../../Services/service";

const AnnouncementChannelCreator = ({ idx, token }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, [idx, token]);

  const fetchMessages = () => {
    if (token !== null) {
      api.getEventMessages(idx, token).then((res) => {
        console.log("h", res.data);
        if (res.status === 200) {
          setMessages(res.data);
        }
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      sendMessage(newMessage);
    }
  };

  const sendMessage = async (messageContent) => {
    try {
      if (token !== null) {
        const res = await api.createEventMessage(idx, messageContent, token);
        if (res.status === 201) {
          setNewMessage("");
          fetchMessages();
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleOpenMenu = (event, messageId) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessageId(messageId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedMessageId(null);
  };

  const handleDeleteMessage = async () => {
    if (selectedMessageId) {
      try {
        if (token !== null) {
          const res = await api.handleDeleteMessage(selectedMessageId, token);
          // console.log(res);
          if (res.status === 204) {
            fetchMessages();
            handleCloseMenu();
          }
        }
      } catch (error) {
        console.log(error, "Error deleting message");
      }
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: 20,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Channel
      </Typography>
      <div style={{ height: "300px", overflowY: "auto", marginBottom: "20px" }}>
        {messages.map((message) => (
          <div
            key={message.AID}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Typography>{message.content}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(message.timestamp).toLocaleTimeString()}
              </Typography>
            </div>
            <IconButton onClick={(e) => handleOpenMenu(e, message.AID)}>
              <MoreVertIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleDeleteMessage}>Delete</MenuItem>
      </Menu>
    </Paper>
  );
};

export default AnnouncementChannelCreator;
