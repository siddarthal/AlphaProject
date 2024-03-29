import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
// import Mainpage from "./Pages/Mainpage.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Hompage.jsx";
import EventDetails from "./Pages/Eventdetails.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import AddEvent from "./Pages/AddEvent.jsx";
import RightSide from "./components/RightSide.jsx";
import HomeContent from "./components/HomeContent.jsx";
import AccountDetails from "./components/AccountDetails.jsx";
import UserEventDetails from "./components/UserEventDetails.jsx";
import { useEffect, useState, useRef } from "react";
import ParticularEvent from "./components/Creator/ParticularEvent.jsx";
import EditExistingEvent from "./components/Creator/EditExistingEvent.jsx";
import "./app.css";
import Invities from "./components/Creator/Invities.jsx";
import Notifications from "./components/Creator/Notifications.jsx";
import Rsvps from "./components/Creator/Rsvps.jsx";
import ParticularChannel from "./components/Creator/ParticularChannel.jsx";
import Channel from "./Pages/Channel.jsx";
import { checkAuthLoader } from "./util/auth.js";

import RightSideChannels from "./components/Creator/RightSideChannels.jsx";
import RightsideEvents from "./components/RighsideEvents.jsx";
import BuyTicket from "./Tickets/BuyTicket.jsx";
import FilterEvents from "./components/Explore/FilterEvents.jsx";
import Events from "./components/Events.jsx";
import AllEvents from "./components/Explore/AllEvents.jsx";
import FilterEvents1 from "./components/Creator/FilterEvents.jsx";
import Alltickets from "./components/Creator/Alltickets.jsx";
import CryptoJS from "crypto-js";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
function App() {
  const [token, setToken] = useState(null);
  const isInitialMount = useRef(true);
  useEffect(() => {
    const encryptedToken = localStorage.getItem("accessToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    // if (isInitialMount.current) {
    //   isInitialMount.current = false;
    //   return;
    // }
    console.log("storedToken", encryptedToken);
    if (encryptedToken && tokenExpiration) {
      if (new Date().getTime() > tokenExpiration) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpiration");
        setToken(null);
      } else {
        const secretKey = "your-secret-key";
        const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        const originalToken = bytes.toString(CryptoJS.enc.Utf8);

        setToken(originalToken);
      }
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      children: [
        {
          path: "/",
          element: <HomeContent />,
        },
        {
          path: "/events",
          element: <Events />,
          children: [
            {
              path: "/events",
              element: <AllEvents token={token}/>,
            },
            {
              path: "/events/all",
              element: <AllEvents token={token}/>,
            },
            {
              path: "/events/eventName/:eventName",
              element: <FilterEvents token={token}/>,
            },
          ],
        },
        {
          path: "/events/:id",
          element: <EventDetails token={token} />,
        },

        {
          path: "/events/tickets/:id",
          element: <BuyTicket token={token} />,
          loader: checkAuthLoader,
        },
        {
          path: "/events/tickets",
          element: <Alltickets token={token} />,
          loader: checkAuthLoader,
        },
        {
          path: "/events/channels",
          element: <Channel token={token} />,
          loader: checkAuthLoader,
          children: [
            {
              path: "",
              element: <RightSideChannels />,
              loader: checkAuthLoader,
            },
            {
              path: "ind/:id/:eventName",
              element: <RightSideChannels token={token} />,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      loader: checkAuthLoader,
      children: [
        {
          path: "/dashboard",
          element: <RightSide token={token} />,
        },

        {
          path: "add",
          element: <AddEvent token={token} />,
        },
        ,
        {
          path: "events",
          element: <UserEventDetails token={token} />,
        },
        {
          path: "accounts",
          element: <AccountDetails token={token} />,
        },
        {
          path: "events/:id",
          element: <ParticularEvent token={token} />,
        },
        {
          path: "edit/:id",
          element: <EditExistingEvent token={token} />,
        },
        {
          path: "invities",
          element: <Invities />,
        },
        {
          path: "rsvps",
          element: <Rsvps />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "eventGroupings/:eventType",
          element: <FilterEvents1 token={token} />,
        },
      ],
    },

    {
      path: "/signin",
      element: <Signin setToken={setToken} />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/pwdUpdate/:id/:token",
      element: <ResetPassword />,
    },
    { path: '*', element: <ErrorPage /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
