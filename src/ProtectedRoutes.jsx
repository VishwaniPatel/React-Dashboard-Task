import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "./core/components/authentication/verifyToken";

const ProtectedRoute = () => {
  return isTokenExpired() ? <Navigate to="/login" replace /> : <Outlet />;
};

export default ProtectedRoute;
