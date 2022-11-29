import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AuthRoutes,
  Cart,
  Favorites,
  Home,
  Login,
  Menu,
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
import { fetchCoupons, fetchOrders, getProfile } from "./redux/user/action";
import { RootState } from "./redux";

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
          <Route path="/orders" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
