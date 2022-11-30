import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux";

const AdminRoutes = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  if (user.role === 1) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoutes;
