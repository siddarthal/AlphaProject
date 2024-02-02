import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/service";
import { Box, Typography, Paper, List, Avatar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person'; // Import the person icon

const RightSideChannels = ({token}) => {
  const { id ,eventName } = useParams();
  const [messages, setMessages] = useState([]);
  console.log(id,"id");
  useEffect(() => {
    if(id!==undefined){
      api
        .getEventMessages(id)
        .then((res) => {
          setMessages(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token,id]);

  return (
    <Paper elevation={3} style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box p={2}>
        <Typography variant="h5">
          {(id===undefined)&&("Browse through channels to get latest info")}
          {eventName}
        </Typography>
      </Box>
      <Box flexGrow={1} sx={{ overflowY: 'auto' }} p={2}>
        <List>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <Box display="flex" alignItems="center" justifyContent="flex-start">
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <Box ml={2} style={{ maxWidth: '70%' }}>
                  <Paper elevation={3} style={{ padding: '12px', backgroundColor: '#2196F3', color: '#fff' }}>
                    <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
                      {message.content}
                    </Typography>
                  </Paper>
                  <Typography variant="caption" style={{ marginLeft: '8px' }}>
                    {message.timeStamp} 
                  </Typography>
                </Box>
              </Box>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default RightSideChannels;
