import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { userContext } from "./context/userContext";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  const id = context.user?.userid ? context.user?.userid : null;

  useEffect(() => {
    if (!id) {
      console.log("user not signed in");
      navigate("/api/signin");
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;