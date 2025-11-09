import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/Authentication/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <div>This is for home component</div> },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
]);

export default router;
