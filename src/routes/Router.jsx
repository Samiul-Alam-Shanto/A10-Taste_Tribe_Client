import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/Authentication/AuthPage";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Errors/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AddReview from "../pages/AddReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/add-review",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
