import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux";

const UserRoutes = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  if (user.role === 0) {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
};

export default UserRoutes;
