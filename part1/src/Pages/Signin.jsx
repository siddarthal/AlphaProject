import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/service";
import image from "../Images/5500661.svg";
import CryptoJS from "crypto-js";

const Signin = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const isSubmitting = false; // You may want to replace this with your own logic

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formValidation = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email must be entered";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log(loading, "loading");
  const signinHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formValidation()) {
      setErrors({});
      api
        .signin(formData)
        .then((res) => {
          console.log("Successful");
          console.log("Result", res);

          if (res.access_token !== undefined) {
            const secretKey = "your-secret-key";

            const encryptedToken = CryptoJS.AES.encrypt(
              res.access_token,
              secretKey
            ).toString();
            localStorage.setItem("accessToken", encryptedToken);
            setToken(res.access_token);
            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
            localStorage.setItem("tokenExpiration", expirationTime);
            setFormData({ email: "", password: "" });
            setLoading(false);
            navigate("/events");
          } else {
            setLoading(false);

            alert("wrong credentials");
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          alert("Wrong credentials");
        });
    } else {
      console.error(`Can't validate`);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xxl"
      style={{ display: "flex", height: "100vh" }}
    >
      <Grid container component="div" style={{ height: "100%", width: "100%" }}>
        {/* left side with image */}
        <Grid
          item
          xs={0}
          sm={6}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* right side with form */}
        <Grid
          item
          xs={12}
          sm={6}
          component={Paper}
          square
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: isMobile
              ? `url('https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1706680118~exp=1706680718~hmac=4d77e51b0d572be79cce84cbee47c7cd208c8da8b7f1f05ab7ad9d13c964539a')`
              : "",
            backgroundPosition: "center",
            display: isMobile ? "flex" : "flex",
          }}
        >
          <div
            style={{
              padding: "20px",
              width: "80%",
              background: "rgba(255, 255, 255, 0.9)",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontFamily: "cursive",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <EventIcon style={{ marginRight: "10px" }} />
              RelEvent
            </Typography>
            <Typography
              variant="h5"
              style={{ fontFamily: "cursive", fontWeight: "bold" }}
            >
              Sign In
            </Typography>
            <form
              style={{ width: "100%", marginTop: "20px" }}
              onSubmit={signinHandler}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    fontFamily: "cursive",
                    borderColor: "#555",
                  },
                }}
                InputLabelProps={{ style: { fontFamily: "cursive" } }}
              />
              {errors.email && (
                <Typography variant="body2" fontWeight="600">
                  {errors.email}
                </Typography>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    fontFamily: "cursive",
                    borderColor: "#555",
                  },
                }}
                InputLabelProps={{ style: { fontFamily: "cursive" } }}
              />
              {errors.password && (
                <Typography variant="body2" fontWeight="600">
                  {errors.password}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  marginTop: "20px",
                  borderRadius: "50px",
                  fontFamily: "cursive",
                }}
                disabled={loading}
              >
                Sign In
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
              <Grid
                container
                component="div"
                style={{
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ marginTop: "10px", width: "50%" }}
                  variant="body2"
                  fontWeight="600"
                >
                  <Link to="/forgotpassword">
                    Oh no I don't remember my password
                  </Link>
                </Typography>
                <Typography
                  sx={{ marginTop: "10px" }}
                  variant="body2"
                  fontWeight="600"
                >
                  New to our site? <Link to="/signup">Signup</Link>
                </Typography>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signin;
