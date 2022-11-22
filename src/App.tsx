import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AuthRoutes,
  Home,
  Login,
  NotFound,
  ProtectedRoutes,
  Register,
} from "./pages";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        {/* <Route element={<AuthRoutes />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* </Route> */}
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/" element={<Home />} />
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
