import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/service";
import { Box, Typography, Paper, List, Avatar, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"; // Import the person icon

const RightSideChannels = ({ token }) => {
  const { id, eventName } = useParams();
  const [messages, setMessages] = useState([]);
  console.log(id, "id");
  useEffect(() => {
    function getMessages() {
      if (id !== undefined && token !== null) {
        api
          .getEventMessages(id, token)
          .then((res) => {
            setMessages(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    getMessages();
    const interval = setInterval(getMessages, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [token, id]);
  let messageArray = [];
  const splitMessages = (message) => {
    messageArray.push({
      timestamp: message[0].timestamp,
      message: [message[0]],
    });
    for (let i = 1; i < message.length; i++) {
      if (
        new Date(message[i].timestamp).getDate() ===
          new Date(message[i - 1].timestamp).getDate() &&
        new Date(message[i].timestamp).getMonth() ===
          new Date(message[i - 1].timestamp).getMonth() &&
        new Date(message[i].timestamp).getFullYear() ===
          new Date(message[i - 1].timestamp).getFullYear()
      ) {
        messageArray[messageArray.length - 1].message.push(message[i]);
      } else {
        messageArray.push({
          timestamp: message[i].timestamp,
          message: message[i],
        });
      }
    }
    console.log(messageArray, "messageArray");
  };
  if (messages.length > 0) {
    splitMessages(messages);
  }
  return (
    <Paper
      elevation={6}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#bac8d1",
      }}
    >
      <Stack spacing={1}>
        <Box p={2} sx={{ backgroundColor: "#d0d9e6" }}>
          <Typography variant="h5">
            {id === undefined
              ? "Browse through channels to get latest info"
              : eventName.replace("Broadcast", "")}
          </Typography>
        </Box>
        {messageArray.map((message, index) => (
          <Box key={index}>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {new Date(message.timestamp).toLocaleDateString()}
            </Typography>
            {message["message"].map((message, index) => (
              <React.Fragment key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: 1,
                    borderColor: "black",
                  }}
                ></Box>
                <Box>
                  <Box style={{ maxWidth: "100%" }}>
                    <Paper
                      elevation={3}
                      style={{
                        padding: "12px",
                        backgroundColor: "#d0d9e6",
                        color: "black",
                        borderLeft: "2px solid #3f51b5",
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                      >
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                        <Typography variant="h6" sx={{ marginLeft: "10px" }}>
                          SenderName
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ pl: 3 }}
                        >
                          {new Date(message.timestamp).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ pt: 1, pl: 6 }}>
                        <Typography
                          variant="body1"
                          sx={{ wordWrap: "break-word" }}
                        >
                          {message.content}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default RightSideChannels;
//
