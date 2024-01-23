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
import { useState } from "react";
import ParticularEvent from "./components/Creator/ParticularEvent.jsx";
import EditExistingEvent from "./components/Creator/EditExistingEvent.jsx";
import "./app.css";
import Invities from "./components/Creator/Invities.jsx";
import Notifications from "./components/Creator/Notifications.jsx";
import Rsvps from "./components/Creator/Rsvps.jsx";
import ParticularChannel from "./components/Creator/ParticularChannel.jsx";
import Channel from "./Pages/Channel.jsx"
import { checkAuthLoader } from "./util/auth.js";

import RightSideChannels from "./components/Creator/RightSideChannels.jsx";

import BuyTicket from "./Tickets/BuyTicket.jsx"
import FilterEvents from "./components/Explore/FilterEvents.jsx";
import Events from "./components/Events.jsx";
import AllEvents from "./components/Explore/AllEvents.jsx";
function App({}) {
  const accessToken = localStorage.getItem("accessToken");
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
          children:[
            {
              path: "/events",
              element: <AllEvents />,
            },
            {
              path: "/events/all",
              element: <AllEvents />,
            },
            {
              path: "/events/eventName/:eventName",
              element:<FilterEvents/>
    
            },
          ]
        },
        {
          path: "/events/:id",
          element: <EventDetails />,
        },
       
        {
          path: "/events/tickets/:id",
          element: <BuyTicket/>
        }
    
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      loader: checkAuthLoader,
      children: [
        {
          path: "/dashboard",
          element: <RightSide />,
        },

        {
          path: "add",
          element: <AddEvent />,
        },
        ,
        {
          path: "events",
          element: <UserEventDetails />,
        },
        {
          path: "accounts",
          element: <AccountDetails />,
        },
        {
          path: "events/:id",
          element: <ParticularEvent />,
        },
        {
          path: "edit/:id",
          element: <EditExistingEvent />,
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
          path:"channels",
          element:<Channel/>,
          children: [
            {
              path:"",
              element:<RightSideChannels/>
            },
            {
              path:"ind/:id",
              element:<RightSideChannels />
            }
          ]
        },
        
      ],
    },

    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  console.log("accessToken", accessToken);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
