import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AuthRoutes,
  Cart,
  Home,
  Login,
  Menu,
  MenuDetail,
  NotFound,
  Order,
  ProtectedRoutes,
  Register,
} from "./pages";
import { UserDispatch } from "./redux/user/types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "./redux/user/action";

function App() {
  const dispatch: UserDispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("sessionId") !== null) {
      dispatch(getProfile());
    }
  }, []);

  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<MenuDetail />} />

        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/orders" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
