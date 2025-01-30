import { IoIosStar } from "react-icons/io";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; 

const Product = ({ productDetails }) => {
  const { image, price, title, rating, id } = productDetails;
  const { rate, count } = rating;

  // Convert price to INR (assuming 1 USD = 30 INR)
  const priceInINR = (price * 30).toFixed(2);

  return (
    <Link to={`/products/${id}`}>
      <div className="min-h-60 max-h-60 shadow-sm rounded-sm p-4 flex flex-col justify-between bg-white hover:bg-slate-50 transition-colors duration-200">
        <center>
          <img
            className="w-20 h-20 object-contain"
            src={image}
            alt={`Product: ${title}`}
          />
        </center>
        <div>
          {/* Title for larger screens */}
          <h1 className="mt-4 text-sm hidden lg:block">
            {title.length > 50 ? `${title.slice(0, 50)}...` : title}
          </h1>
          {/* Title for smaller screens */}
          <h1 className="mt-4 text-sm lg:hidden">
            {title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </h1>
          {/* Price */}
          <p className="my-2 font-semibold">From ₹ {priceInINR}</p>
          {/* Rating */}
          <div className="flex flex-row items-center gap-3">
            <span className="py-1 px-2 rounded-sm bg-green-700 text-xs font-semibold text-white flex flex-row items-center gap-1">
              {rate} <IoIosStar />
            </span>
            <span className="text-slate-600 font-semibold text-sm">
              {count} Ratings
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;

// PropTypes validation
Product.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};