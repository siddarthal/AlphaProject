import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import Mainpage from "./Pages/Mainpage.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Hompage.jsx";
import EventDetails from "./Pages/Eventdetails.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import AddEvent from "./Pages/AddEvent.jsx";
import RightSide from "./components/RightSide.jsx";
import HomeContent from "./components/HomeContent.jsx";
import UserEventDetails from "./components/UserEventDetails.jsx";
import { useState } from "react";
// import AccountDetails from "./components/AccountDetails.jsx";

function App({}) {
const [eventPresent, setEventPresent] = useState(0);

  const accessToken = localStorage.getItem("accessToken");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      children: [
        {
          path: "/",
          element:<HomeContent/>

        },
        {
          path: "/events",
          element: <Mainpage />,
        },
        {
          path: "/events/:id",
          element: <EventDetails />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard",
        element: <RightSide eventPresent={eventPresent}/>,
        },

        {
          path: "add",
          element: <AddEvent eventPresent={eventPresent} setEventPresent={setEventPresent}/>,
        },
        ,
        {
          path: "events",
          element:<UserEventDetails/>
        }
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
