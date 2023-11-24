import { createBrowserRouter } from "react-router-dom";
//*pages components
import Layout from "../components/layout";
import HomePage from "./home";
import DragPage from "./drag";
import LoginPage from "./authentication/login";

export default createBrowserRouter([
  {
    element: <Layout />,
    children:
    [
      {
        path: "/",
        index: true,
        element: <HomePage />
      },
      {
        path: "/drag",
        index: true,
        element: <DragPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  }
])