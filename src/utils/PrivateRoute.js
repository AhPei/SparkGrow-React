import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

// Components
import Header from "../components/Header";
export default function PrivateRoute({ success }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Save user location before login
  useEffect(() => {
    const name = "location";
    const path = sessionStorage.getItem(name);
    if (success && path) {
      navigate(path);
      sessionStorage.removeItem(name);
    } else if (!success) {
      sessionStorage.setItem(name, location.pathname);
    }
  }, [success]);

  if (!success) return <Navigate to={`/login`} />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
