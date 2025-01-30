import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import Cookie from "js-cookie";
import LoginImage from "../assets/Login.svg";
import EmptyCartImage from "../assets/EmptyCart.png";

const Cart = () => {
  const productList = useSelector((state) => state.cart);
  const jwtToken = Cookie.get("jwtToken");

  // Show login prompt if the user is not authenticated
  if (!jwtToken) {
    return (
      <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28 flex flex-col items-center justify-center">
        <img
          className="w-[50%] md:w-[40%]"
          src={LoginImage}
          alt="Login Required"
        />
        <h1 className="text-xl md:text-2xl font-semibold my-2">
          You are not Logged In!
        </h1>
        <p>Please Login to access this Cart feature.</p>
      </div>
    );
  }

  // Show empty cart message if no products are in the cart
  if (productList.length === 0) {
    return (
      <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28 flex flex-col items-center justify-center">
        <img
          className="w-[45%] md:w-[30%] lg:w-[25%]"
          src={EmptyCartImage}
          alt="Empty Cart"
        />
        <h1 className="text-xl md:text-2xl font-semibold my-2">
          Your cart is empty!
        </h1>
        <p className="text-center">
          Add some products to your cart to view them here.
        </p>
      </div>
    );
  }

  // Show cart with products
  return (
    <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28">
      <div className="my-2 min-h-lvh bg-white rounded-xs p-4">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {productList.map((product) => (
            <CartProduct key={product.id} productDetails={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
