import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export function CustomerAuth({ children }) {
  const { userData } = useContext(UserContext);

  if (userData.role == "Customer") {
    return children;
  } else {
    return <Navigate to="/profile" />;
  }
}

export function TradererAuth({ children }) {
  const { userData } = useContext(UserContext);

  if (userData.role == "Individual" || userData.role == "Business") {
    return children;
  } else {
    return <Navigate to="/profile" />;
  }
}
