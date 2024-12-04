import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export function ProtectedRoute({children}) {
  if (localStorage.getItem("Token")) {
    return  children;
  } else {
    return <Navigate to="/login" />;
  }
}
export function ProtectedAdminRoute({ children }) {
  if (localStorage.getItem("Token")) {
    return children;
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
