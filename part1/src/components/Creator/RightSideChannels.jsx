import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/service";
import { Box, Typography, Paper, List, Avatar, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"; // Import the person icon

const RightSideChannels = ({ token, eventdata }) => {
  const { id, eventName } = useParams();
  const [messages, setMessages] = useState([]);
  console.log(id, "id");
  console.log(eventdata, "eventdata");
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
  }, [token, id, eventdata]);
  // const fetchNameDetails = () => {
  //   eventdata.forEach((item) => {
  //     console.log(item.event.EID + " " + id, "item outsdieeeeeee");
  //     if (parseInt(item.event.EID, 10) === parseInt(id, 10)) {
  //       console.log(item.event.EID + " " + id, "item inside");
  //       return 2;
  //     }
  //   });
  //   return 1;
  // };

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
          message: [message[i]],
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
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#bac8d1",
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Stack spacing={1}>
        <Box
          p={2}
          sx={{
            backgroundColor: "#bac8d1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">
            {id === undefined
              ? "Browse through channels to get latest info"
              : eventName.replace("Broadcast", "")}
          </Typography>
        </Box>
        {messageArray.map((message, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::before, &::after": {
                  content: '""',
                  flex: 1,
                  borderBottom: "1px solid black",
                },
                "&::before": {
                  marginRight: "0.5rem",
                },
                "&::after": {
                  marginLeft: "0.5rem",
                },
              }}
            >
              <Typography variant="caption" color="textSecondary">
                {new Date(message.timestamp).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
            <Paper
              elevation={3}
              style={{
                padding: "12px",
                backgroundColor: "#d0d9e6",
                color: "black",
                borderLeft: "2px solid #3f51b5",
              }}
            >
              {message["message"].map((message, index) => (
                <React.Fragment key={index}>
                  <Box
                    sx={{
                      paddingBottom: 2,
                    }}
                  >
                    <Box style={{ maxWidth: "100%" }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                      >
                        <Avatar
                          src={message.broadcast.event.user.profile_pic} // Set src attribute based on user's profile pic
                          sx={{
                            margin: "16px 0",
                          }}
                        >
                          {message.broadcast.event.user.name.charAt(0)}
                        </Avatar>
                        <Typography variant="h6" sx={{ marginLeft: "10px" }}>
                          {message.broadcast.event.user.name} 
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ pl: 3 }}
                        >
                          {new Date(message.timestamp).toLocaleDateString()}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ pl: 0.7 }}
                        >
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
                    </Box>
                  </Box>
                </React.Fragment>
              ))}
            </Paper>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default RightSideChannels;
//
