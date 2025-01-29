import { IoIosStar } from "react-icons/io";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeFromFavorite } from "../redux/slice/wishlistSlice";
const WishlistProduct = ({ productDetails }) => {
  const { image, title, rating, id } = productDetails;
  const { rate, count } = rating;

  let dispatch = useDispatch();

  const handleRemoveProduct = (id) => {
    dispatch(removeFromFavorite(id));
  };

  return (
    <div className="shadow-sm rounded-sm p-4 flex flex-col justify-between bg-white">
      <div className="relative">
        <button
          onClick={() => handleRemoveProduct(id)}
          className="absolute z-50 -right-2 -top-2 p-1.5 bg-red-500 hover:bg-red-600 cursor-pointer text-white text-2xl rounded-full"
        >
          <MdDeleteOutline />
        </button>
        <center>
          <img className="w-20 h-20" src={image} alt={title} />
        </center>
      </div>
      <>
        <h1 className="mt-4 text-sm hidden lg:block">
          {title.slice(0, 50) + "..."}
        </h1>
        <h1 className="mt-4 text-sm lg:hidden">{title.slice(0, 30) + "..."}</h1>
        <Link
          to={`/products/${id}`}
          className="my-2 text-sm font-semibold text-blue-700 hover:text-blue-500"
        >
          View Details
        </Link>
        <div className="flex flex-row items-center gap-3">
          <span className="py-1 px-2 rounded-sm bg-green-700 text-xs font-semibold text-white flex flex-row items-center gap-1">
            {rate}
            <IoIosStar />
          </span>
          <span className="text-slate-600 font-semibold text-sm">
            {count} Ratings
          </span>
        </div>
      </>
    </div>
  );
};

export default WishlistProduct;

WishlistProduct.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
    title: PropTypes.string,
  }),
};
