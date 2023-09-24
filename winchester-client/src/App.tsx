import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
]);

export default () => <RouterProvider router={router} />;
