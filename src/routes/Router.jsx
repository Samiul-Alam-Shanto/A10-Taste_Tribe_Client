import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/Authentication/AuthPage";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Errors/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// Reviews
import AddReview from "../pages/AddReview";
import AllReviews from "../pages/AllReviews";
import ReviewDetails from "../pages/ReviewDetails";
import EditReview from "../pages/EditReview";

// Pages
import DashboardLayout from "../layouts/DashoboardLayout";
import AboutUs from "../pages/AboutUs";
import CoveragePage from "../pages/CoveragePage";
import ContactUs from "../pages/Static/ContactUs";
import CommunityGuidelines from "../pages/Static/CommunityGuidelines";
import Blog from "../pages/Static/Blog";
import Leaderboard from "../pages/Static/Leaderboard";

// Dashboard
import UserHome from "../pages/Dashboard/User/UserHome";
import MyReviews from "../pages/MyReviews";
import MyFavorites from "../pages/MyFavorites";
import GoPremium from "../pages/Dashboard/GoPremium";
import PaymentPage from "../pages/Dashboard/PaymentPage";
import EditProfile from "../pages/Dashboard/User/EditProfile";

import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <AuthPage /> },
      { path: "all-reviews", element: <AllReviews /> },
      { path: "review-details/:id", element: <ReviewDetails /> },

      // Static Pages
      { path: "about-us", element: <AboutUs /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "community-guidelines", element: <CommunityGuidelines /> },
      { path: "blog", element: <Blog /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "coverage", element: <CoveragePage /> },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <UserHome /> },
      { path: "user-home", element: <UserHome /> },
      { path: "edit-profile", element: <EditProfile /> }, // Registered Route

      { path: "add-review", element: <AddReview /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "edit-review/:id", element: <EditReview /> },
      { path: "go-premium", element: <GoPremium /> },
      { path: "payment", element: <PaymentPage /> },

      // Admin Routes
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-reviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
