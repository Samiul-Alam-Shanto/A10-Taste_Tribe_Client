import React from "react";
import useAuth from "../hooks/useAuth";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <UniversalSpinner />;

  if (user && user.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/auth" />;
  }
};

export default PrivateRoute;
