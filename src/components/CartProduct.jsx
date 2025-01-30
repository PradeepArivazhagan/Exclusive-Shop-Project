import { IoIosStar } from "react-icons/io";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/slice/cartSlice";

const CartProduct = ({ productDetails }) => {
  const { image, title, rating, id } = productDetails;
  const { rate, count } = rating;

  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className="shadow-sm rounded-sm p-4 flex flex-col justify-between bg-white">
      <div className="relative">
        <button
          onClick={handleRemoveProduct}
          className="absolute z-50 -right-2 -top-2 p-1.5 bg-red-400 hover:bg-red-500 cursor-pointer text-white text-xl rounded-full"
        >
          <MdRemoveShoppingCart />
        </button>
        <div className="flex justify-center">
          <img className="w-20 h-20 object-contain" src={image} alt={title} />
        </div>
      </div>
      
      <h1 className="mt-4 text-sm lg:block hidden">{`${title.slice(0, 50)}...`}</h1>
      <h1 className="mt-4 text-sm lg:hidden">{`${title.slice(0, 30)}...`}</h1>
      
      <Link
        to={`/products/${id}`}
        className="my-2 text-sm font-semibold text-blue-700 hover:text-blue-500"
      >
        View Details
      </Link>
      
      <div className="flex flex-row items-center gap-3">
        <span className="py-1 px-2 rounded-sm bg-green-700 text-xs font-semibold text-white flex items-center gap-1">
          {rate} <IoIosStar />
        </span>
        <span className="text-slate-600 font-semibold text-sm">
          {count} Ratings
        </span>
      </div>
    </div>
  );
};

export default CartProduct;

// Improved PropTypes validation
CartProduct.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
