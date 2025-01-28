import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";
const Protected = () => {
  let jwtToken = Cookie.get("jwtToken");
  return jwtToken === undefined ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
