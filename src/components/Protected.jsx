import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const Protected = () => {
  // Get the JWT token from cookies
  const jwtToken = Cookie.get("jwtToken");

  // If the token is present, render the protected content (Outlet)
  // Otherwise, redirect to the login page
  return !jwtToken ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
