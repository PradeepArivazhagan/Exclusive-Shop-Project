import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookie from "js-cookie";

const Login = () => {
  let jwtToken = Cookie.get("jwtToken");
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      })
      .then((response) => {
        let jwtToken = response.data.token;
        Cookie.set("jwtToken", jwtToken, { expires: 30 });
        navigate("/", { replace: true }); // Redirect to dashboard if jwtToken is found and valid
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (jwtToken !== undefined) {
    navigate("/", { replace: true }); // Redirect to dashboard if jwtToken is found and valid
  }

  return (
    <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28 flex flex-row justify-center items-center">
      <div className="min-w-80 bg-white rounded-xs py-6 px-6">
        <h1 className="text-center font-semibold text-xl">Login Page</h1>
        <form className="mt-4 flex flex-col" onSubmit={handleLogin}>
          <label htmlFor="username">UserName</label>
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Email"
            className="border-2 border-slate-200 mt-1 px-3 py-1 bg-slate-50 rounded-sm focus:outline-0"
          />
          <label htmlFor="password" className="mt-4">
            Password
          </label>
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Password"
            className="border-2 border-slate-200 mt-1 px-3 py-1 bg-slate-50 rounded-sm focus:outline-0"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-700 hover:bg-blue-600 cursor-pointer py-1.5 rounded-sm text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
