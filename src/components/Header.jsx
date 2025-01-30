import PropTypes from "prop-types";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Header = () => {
  const jwtToken = Cookie.get("jwtToken");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    Cookie.remove("jwtToken");
    navigate("/", { replace: true });
  };

  // Reusable navigation button component
  const NavButton = ({ to, icon: Icon, activePath }) => (
    <Link to={to}>
      <button
        className={`p-1.5 rounded-full hover:bg-slate-100 cursor-pointer ${
          pathname === activePath ? "bg-slate-100" : ""
        }`}
      >
        <Icon className="size-5.5 md:size-6" />
      </button>
    </Link>
  );

  // Prop validation for NavButton
  NavButton.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    activePath: PropTypes.string.isRequired,
  };

  return (
    <nav className="fixed z-10 bg-white w-full shadow-sm py-4 px-6 md:px-20 lg:px-28 flex flex-row items-center justify-between">
      <Link to="/">
        <h1 className="text-xl md:text-2xl italic font-bold text-blue-700 drop-shadow-xs">
          Exclusive <span className="text-yellow-400 md:text-xl">Shop</span>
        </h1>
      </Link>
      <div className="flex flex-row items-center gap-2 md:gap-5">
        <NavButton to="/wishlist" icon={HiOutlineHeart} activePath="/wishlist" />
        <NavButton to="/cart" icon={HiOutlineShoppingCart} activePath="/cart" />
        
        {jwtToken ? (
          <button
            className="py-2 px-6 text-sm text-white font-semibold rounded-sm bg-red-700 hover:bg-red-600 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="py-2 px-6 text-sm text-white font-semibold rounded-sm bg-blue-700 hover:bg-blue-600 cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
