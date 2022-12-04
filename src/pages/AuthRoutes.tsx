import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const isLogged = localStorage.getItem("sessionId");

  if (isLogged !== null) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoutes;
