import React from 'react'
import { useJwt } from "react-jwt";
import { useNavigate, Outlet} from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  const tokn = document.cookie.token
  console.log(tokn);

  if(tokn){
      return navigate("/api/signin");
  }

  
  return <Outlet/>;
}

export default ProtectedRoute;