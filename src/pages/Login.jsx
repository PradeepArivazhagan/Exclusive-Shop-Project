import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { ThreeDot } from "react-loading-indicators";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect user if already logged in
  useEffect(() => {
    if (Cookie.get("jwtToken")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        formData
      );
      Cookie.set("jwtToken", response.data.token, { expires: 30 });
      navigate("/", { replace: true });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28 flex flex-row justify-center items-center">
      <div className="min-w-80 bg-white rounded-xs py-6 px-6">
        <h1 className="text-center font-semibold text-xl">Login Page</h1>

        {error && (
          <p className="text-red-600 text-sm text-center mt-2">{error}</p>
        )}

        <form className="mt-4 flex flex-col" onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            required
            name="username"
            value={formData.username}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Password"
            className="border-2 border-slate-200 mt-1 px-3 py-1 bg-slate-50 rounded-sm focus:outline-0"
          />

          <button
            type="submit"
            className="mt-4 bg-blue-700 hover:bg-blue-600 cursor-pointer py-1.5 rounded-sm text-white"
          >
            {isLoading ? <ThreeDot color="#ffffff" size="small" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
