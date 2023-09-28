import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default () => <RouterProvider router={router} />;
