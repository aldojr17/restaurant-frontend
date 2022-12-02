import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux";

const AdminRoutes = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const isLogged = localStorage.getItem("sessionId");

  if (user.role === 1 || isLogged === null) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoutes;
