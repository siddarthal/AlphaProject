import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import Mainpage from "./Pages/Mainpage.jsx";
import EventDetails from "./Pages/Eventdetails.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Homepage from "./Pages/Hompage.jsx";
function App({}) {
  const accessToken = localStorage.getItem("accessToken");
  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Homepage />,
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
  ]);

  console.log("accessToken", accessToken);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
