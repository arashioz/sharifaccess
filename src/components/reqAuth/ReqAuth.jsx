import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Dashboard from "../../view/Dashboard/Dashboard";
function ReqAuth() {
  let { auth } = useAuth();
    console.log(auth);
    // auth.user ? <Outlet /> : <Navigate to={"/"} />;
  return <Outlet/>
}

export default ReqAuth;
