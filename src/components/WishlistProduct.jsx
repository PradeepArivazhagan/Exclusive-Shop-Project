import { IoIosStar } from "react-icons/io";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Fixed import
import { IoMdHeartDislike } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeFromFavorite } from "../redux/slice/wishlistSlice";

const WishlistProduct = ({ productDetails }) => {
  const { image, title, rating, id } = productDetails;
  const { rate, count } = rating;

  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    dispatch(removeFromFavorite(id));
  };

  return (
    <div className="shadow-sm rounded-sm p-4 flex flex-col justify-between bg-white hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        {/* Delete button */}
        <button
          onClick={handleRemoveProduct}
          className="absolute z-50 -right-2 -top-2 p-1.5 bg-red-400 hover:bg-red-500 cursor-pointer text-white text-xl rounded-full"
          aria-label="Remove from wishlist" // Accessibility improvement
        >
          <IoMdHeartDislike />
        </button>
        {/* Product image */}
        <center>
          <img
            className="w-20 h-20 object-contain"
            src={image}
            alt={`Product: ${title}`} // Improved alt text
          />
        </center>
      </div>
      {/* Product details */}
      <div>
        {/* Title for larger screens */}
        <h1 className="mt-4 text-sm hidden lg:block">
          {title.length > 50 ? `${title.slice(0, 50)}...` : title}
        </h1>
        {/* Title for smaller screens */}
        <h1 className="mt-4 text-sm lg:hidden">
          {title.length > 30 ? `${title.slice(0, 30)}...` : title}
        </h1>
        {/* View details link */}
        <Link
          to={`/products/${id}`}
          className="mt-2 text-sm font-semibold text-blue-700 hover:text-blue-500"
        >
          View Details
        </Link>
        {/* Rating */}
        <div className="mt-2 flex flex-row items-center gap-3">
          <span className="py-1 px-2 rounded-sm bg-green-700 text-xs font-semibold text-white flex flex-row items-center gap-1">
            {rate} <IoIosStar />
          </span>
          <span className="text-slate-600 font-semibold text-sm">
            {count} Ratings
          </span>
        </div>
      </div>
    </div>
  );
};

export default WishlistProduct;

// PropTypes validation
WishlistProduct.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};