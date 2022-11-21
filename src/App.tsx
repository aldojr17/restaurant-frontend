import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes, Login, NotFound, ProtectedRoutes } from "./pages";
import Register from "./pages/Register";

function App() {
  return (
    <div className="container-fluid my-auto">
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
