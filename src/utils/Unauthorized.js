import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Unauthorized({ success }) {
  return success ? <Navigate to="/" /> : <Outlet />;
}
