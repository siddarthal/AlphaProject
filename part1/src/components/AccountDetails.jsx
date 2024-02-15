// // AccountDetails.js
// import React, { useEffect, useState } from "react";
// import { Grid, Typography, Avatar, TextField, Button } from "@mui/material";
// import {
//   deepOrange,
//   deepPurple,
//   teal,
//   amber,
//   pink,
// } from "@mui/material/colors";
// import api from "../Services/service";
// const getRandomColor = () => {
//   const colors = [
//     deepOrange[500],
//     deepPurple[500],
//     teal[500],
//     amber[500],
//     pink[500],
//   ];
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// };

// const AccountDetails = ({token}) => {
//   const userData = {
//     name: "",
//     email: "",
//     id: 0,
//   };
//   const [user, setUser] = useState(userData);
//   useEffect(() => {
//     api.userAccountDatails(token).then((res) => {
//       console.log(res.data);
//       setUser(res.data);
//     });
//   }, [token]);

//   const handleUsernameChange = (event) => {
//     console.log(event.target.value);
//     // setUser({ ...event, [event.target.name]: event.target.value });
//     setUser((prevUser) => ({
//       ...prevUser,
//       [event.target.name]: event.target.value,
//     }));
//   };
//   const handleSubmit=()=>{
//     api.editAccountDetails(user.name,token).then((res)=>{
//       console.log(res.data.message);
//       alert(res.data.message)
//     }).catch(error =>
//       console.log(error))
//   }
//   const avatarColor = getRandomColor();

//   return (
//     <Grid container justifyContent="center" alignItems="center" height="85vh">
//       <Grid item xs={12} sm={8} md={6} lg={4}>
//         <Grid container direction="column" alignItems="center">
//           <Avatar
//             sx={{
//               bgcolor: avatarColor,
//               width: 80,
//               height: 80,
//               fontSize: 36,
//               margin: "16px 0",
//             }}
//           >
//             {/* {user.name.charAt(0)} */}
//           </Avatar>
//           <Typography variant="h5" gutterBottom>
//             Hello, {user.name}
//           </Typography>
//           <TextField
//             name="name"
//             variant="outlined"
//             value={user.name}
//             onChange={handleUsernameChange}
//             fullWidth
//             sx={{ marginBottom: 2, width: "80%" }}
//           />
//           <TextField
//             label="Email"
//             variant="outlined"
//             value={user.email}
//             fullWidth
//             disabled
//             sx={{ marginBottom: 2, width: "80%" }}
//           />
//           <TextField
//             label="User ID"
//             variant="outlined"
//             value={user.id}
//             fullWidth
//             disabled
//             sx={{ width: "80%" }}
//           />
//           <Button sx={{ paddingTop: 3 }} onClick={handleSubmit} >Save Changes</Button>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default AccountDetails;

import React, { useEffect, useState } from "react";
import { Grid, Typography, Avatar, TextField, IconButton, Button } from "@mui/material";
import {
  deepOrange,
  deepPurple,
  teal,
  amber,
  pink,
} from "@mui/material/colors";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"; // Import Edit and Delete icons
import api from "../Services/service";

const getRandomColor = () => {
  const colors = [
    deepOrange[500],
    deepPurple[500],
    teal[500],
    amber[500],
    pink[500],
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const AccountDetails = ({ token }) => {
  const userData = {
    name: "",
    email: "",
    id: 0,
    profile_pic: null,
  };

  const [user, setUser] = useState(userData);
  const [profileImage, setProfileImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDirty, setIsDirty] = useState(false); // Track whether changes are detected

  useEffect(() => {
    api.userAccountDatails(token).then((res) => {
      setUser(res.data);
    });
  }, [token]);

  const handleUsernameChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
    setIsDirty(true); // Mark changes detected
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
    setUser((prevUser) => ({
      ...prevUser,
      profile_pic: URL.createObjectURL(event.target.files[0]),
    }));
    setIsDirty(true); // Mark changes detected
  };

  const handleEditClick = () => {
    document.getElementById('profile-pic-upload').click();
  };

  const handleDeleteClick = () => {
    setProfileImage(null);
    setUser((prevUser) => ({
      ...prevUser,
      profile_pic: null,
    }));
    setIsDirty(true); // Mark changes detected
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("profile_pic", profileImage);

    api.editAccountDetails(formData, token)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        setIsDirty(false); // Reset changes detection after successful submission
      }).catch(error => {
        console.log(error);
      });
  };

  const avatarColor = getRandomColor();

  return (
    <Grid container justifyContent="center" alignItems="center" height="85vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Grid container direction="column" alignItems="center">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <Avatar
              src={user.profile_pic} // Set src attribute based on user's profile pic
              sx={{
                bgcolor: avatarColor,
                width: 80,
                height: 80,
                fontSize: 36,
                margin: "16px 0",
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            {isHovered && (
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <IconButton
                  size="small"
                  style={{ marginRight: 4 }}
                  onClick={handleEditClick}
                >
                  <EditIcon />
                </IconButton>
                {user.profile_pic && (
                  <IconButton
                    size="small"
                    onClick={handleDeleteClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            )}
          </div>
          <input
            type="file"
            id="profile-pic-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <Typography variant="h5" gutterBottom>
            Hello, {user.name}
          </Typography>
          <TextField
            name="name"
            variant="outlined"
            value={user.name}
            onChange={handleUsernameChange}
            fullWidth
            sx={{ marginBottom: 2, width: "80%" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={user.email}
            fullWidth
            disabled
            sx={{ marginBottom: 2, width: "80%" }}
          />
          <TextField
            label="User ID"
            variant="outlined"
            value={user.id}
            fullWidth
            disabled
            sx={{ width: "80%" }}
          />
          <Button sx={{ paddingTop: 3 }} disabled={!isDirty} onClick={handleSubmit}>Save Changes</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountDetails;
