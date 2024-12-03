import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}) {
  if (localStorage.getItem("Token")) {
    return  children;
  } else {
    return <Navigate to="/login" />;
  }
}
export function ProtectedAdminRoute({children}) {
  if (localStorage.getItem("Token")) {
    return  children;
  } else {
    return <Navigate to="/login" />;
  }
}
export function ProtectedAuthRoute({children}) {
  if (!localStorage.getItem("Token")) {
    return children;
  } else {
  return <Navigate to="/" />;
  }
}
