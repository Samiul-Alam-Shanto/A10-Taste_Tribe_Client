import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/Authentication/AuthPage";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
]);

export default router;
