import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux";

const AuthRoutes = () => {
  const isLogged = localStorage.getItem("sessionId");
  const { user } = useSelector((state: RootState) => state.userReducer);

  if (isLogged !== null) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoutes;
