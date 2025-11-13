import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/Authentication/AuthPage";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Errors/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AddReview from "../pages/AddReview";
import AllReviews from "../pages/AllReviews";
import ReviewDetails from "../pages/ReviewDetails";
import MyReviews from "../pages/MyReviews";
import EditReview from "../pages/EditReview";
import MyFavorites from "../pages/MyFavorites";
import AboutUs from "../pages/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/all-reviews",
        element: <AllReviews />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/review-details/:id",
        element: (
          <PrivateRoute>
            <ReviewDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-review",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-review/:id",
        element: (
          <PrivateRoute>
            <EditReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
