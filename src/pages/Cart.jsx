import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  let productList = useSelector((state) => state.cart);

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
