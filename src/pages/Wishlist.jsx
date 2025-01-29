import Cookie from "js-cookie";
import Login from "../assets/Login.svg";
import EmptyWishlist from "../assets/EmptyWishList.jpg";
import { useSelector } from "react-redux";
import WishlistProduct from "../components/WishlistProduct";
const Wishlist = () => {
  let wishlistProducts = useSelector((state) => state.wishlist);
  let jwtToken = Cookie.get("jwtToken");
  return (
    <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28">
      {jwtToken !== undefined ? (
        wishlistProducts.length > 0 ? (
          <div className="my-2 min-h-lvh bg-white rounded-xs p-4">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {wishlistProducts.map((product) => (
                <WishlistProduct key={product.id} productDetails={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="my-2 px-10 md:px-0 min-h-lvh bg-white rounded-xs flex flex-col items-center justify-center">
            <img className="w-[50%] md:w-[40%] lg:w-[30%]" src={EmptyWishlist} alt="empty cart" />
            <h1 className="text-xl md:text-2xl font-semibold my-2">
              Your Wishlist is empty!
            </h1>
            <p className="text-center">Add some products to your Wishlist to view them here.</p>
          </div>
        )
      ) : (
        <div className="my-2 min-h-lvh bg-white rounded-xs flex flex-col items-center justify-center">
          <img className="w-[50%] md:w-[40%]" src={Login} alt="empty cart" />
          <h1 className="text-xl md:text-2xl font-semibold my-2">
            Your are not Logged In!
          </h1>
          <p>Please Login to access this Wishlist feature</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
