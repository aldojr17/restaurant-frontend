import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AuthRoutes,
  Cart,
  Dashboard,
  Favorites,
  Home,
  Login,
  Menu,
  MenuAdmin,
  MenuDetail,
  NotFound,
  Order,
  Profile,
  ProtectedRoutes,
  Register,
} from "./pages";
import { UserDispatch } from "./redux/user/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCoupons, getProfile } from "./redux/user/action";
import { RootState } from "./redux";
import AdminRoutes from "./pages/AdminRoutes";
import UserRoutes from "./pages/UserRoutes";

function App() {
  const dispatch: UserDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (localStorage.getItem("sessionId") !== null) {
      dispatch(getProfile());
      dispatch(fetchCoupons());
    }
  }, [user.id]);

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
          <Route element={<UserRoutes />}>
            <Route path="/orders" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/menu" element={<MenuAdmin />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
