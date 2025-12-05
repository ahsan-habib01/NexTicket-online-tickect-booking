import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Home from "../Pages/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'auth/login',
        Component: Login,
      },
      {
        path: 'auth/register',
        Component: Register,
      },
    ]
  },
]);

export default router;