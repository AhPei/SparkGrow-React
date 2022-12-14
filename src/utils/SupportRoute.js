import { Navigate, Outlet } from "react-router-dom";

export default function SupportRoute({ success }) {
  // if (!success) return <Navigate to="/login" replace />;

  return <Outlet />;
}
