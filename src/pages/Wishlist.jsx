import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import WishlistProduct from "../components/WishlistProduct";
import LoginImage from "../assets/Login.svg";
import EmptyWishlistImage from "../assets/EmptyWishList.png";

const Wishlist = () => {
  const wishlistProducts = useSelector((state) => state.wishlist);
  const jwtToken = Cookie.get("jwtToken");

  // Show login prompt if the user is not authenticated
  if (!jwtToken) {
    return (
      <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28 flex flex-col items-center justify-center">
        <img className="w-[50%] md:w-[40%]" src={LoginImage} alt="Login Required" />
        <h1 className="text-xl md:text-2xl font-semibold my-2">You are not Logged In!</h1>
        <p>Please Login to access this Wishlist feature.</p>
      </div>
    );
  }

  // Show empty wishlist message if no products are in the wishlist
  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28 flex flex-col items-center justify-center">
        <img className="w-[55%] md:w-[40%] lg:w-[30%]" src={EmptyWishlistImage} alt="Empty Wishlist" />
        <h1 className="text-xl md:text-2xl font-semibold my-2">Your Wishlist is empty!</h1>
        <p className="text-center">Add some products to your Wishlist to view them here.</p>
      </div>
    );
  }

  // Show wishlist with products
  return (
    <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28">
      <div className="my-2 min-h-lvh bg-white rounded-xs p-4">
        <h1 className="text-2xl font-semibold">Your Wishlist</h1>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {wishlistProducts.map((product) => (
            <WishlistProduct key={product.id} productDetails={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
