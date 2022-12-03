import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AuthRoutes,
  Cart,
  CouponAdmin,
  Dashboard,
  Favorites,
  Home,
  Login,
  Menu,
  MenuAdmin,
  MenuDetail,
  NotFound,
  Order,
  OrderDetail,
  OrderDetailAdmin,
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
    <div className="container-fluid mb-5 mt-3">
      {user.role !== 0 ? (
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
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<MenuAdmin />} />
            <Route path="/coupon" element={<CouponAdmin />} />
            <Route path="/:id" element={<OrderDetailAdmin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
