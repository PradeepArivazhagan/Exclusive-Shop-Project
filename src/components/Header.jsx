import { HiOutlineHeart } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router";
import Cookie from "js-cookie";
const Header = () => {
  let jwtToken = Cookie.get("jwtToken");
  let navigate = useNavigate();
  let { pathname } = useLocation();

  const handleLogout = () => {
    Cookie.remove("jwtToken");
    navigate("/", { replace: true });
  };

  return (
    <nav className="fixed z-10 bg-white w-full shadow-sm py-4 px-6 md:px-20 lg:px-28  flex flex-row items-center justify-between">
      <Link to="/">
        <h1 className="text-2xl italic font-bold text-blue-700 drop-shadow-xs">
          Exclusive <span className="text-yellow-400 text-xl">Shop</span>
        </h1>
      </Link>
      <div className="flex flex-row items-center gap-2 md:gap-5">
        <Link to="/wishlist">
          <button
            className={`p-1.5 rounded-full hover:bg-slate-100 ${
              pathname === "/wishlist" && "bg-slate-100"
            } cursor-pointer`}
          >
            <HiOutlineHeart className="size-5.5 md:size-6" />
          </button>
        </Link>
        <Link to="/cart">
          <button
            className={`p-1.5 rounded-full hover:bg-slate-100 cursor-pointer ${
              pathname === "/cart" && "bg-slate-100"
            }`}
          >
            <HiOutlineShoppingCart className="size-5.5 md:size-6" />
          </button>
        </Link>
        {jwtToken === undefined ? (
          <Link to="/login">
            <button className="py-2 px-6 text-sm text-white font-semibold rounded-sm bg-blue-700 hover:bg-blue-600 cursor-pointer">
              Login
            </button>
          </Link>
        ) : (
          <button
            className="py-2 px-6 text-sm text-white font-semibold rounded-sm bg-red-700 hover:bg-red-600 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
