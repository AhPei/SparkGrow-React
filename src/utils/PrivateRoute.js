import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

// Components
import Header from "../components/Header";
export default function PrivateRoute({ success }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const id = "location";
    const path = sessionStorage.getItem(id)
    if (success && path) {
      navigate(path);
      sessionStorage.removeItem(id);
    } else sessionStorage.setItem(id, location.pathname);
  }, []);

  if (!success)
    return <Navigate to={`/login`} />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
