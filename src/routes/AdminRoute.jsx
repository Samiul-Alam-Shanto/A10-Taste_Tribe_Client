import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <UniversalSpinner />;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth" />;
};

export default AdminRoute;
