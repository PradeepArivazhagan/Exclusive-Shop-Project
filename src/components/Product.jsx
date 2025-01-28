import { IoIosStar } from "react-icons/io";
import PropTypes from "prop-types";
import { Link } from "react-router";
const Product = ({ productDetails }) => {
  const { image, price, title, rating, id } = productDetails;
  const { rate, count } = rating;
  return (
    <Link to={`/products/${id}`}>
      <div className="min-h-60 max-h-60 shadow-sm rounded-sm p-4 flex flex-col justify-between bg-white hover:bg-slate-50">
        <center>
          <img className="w-20 h-20" src={image} alt={title} />
        </center>
        <>
          <h1 className="mt-4 text-sm hidden lg:block">{title.slice(0, 50) + "..."}</h1>
          <h1 className="mt-4 text-sm lg:hidden">{title.slice(0, 30) + "..."}</h1>
          <p className="my-2 font-semibold">From ₹ {price * 30}</p>
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
    </Link>
  );
};

export default Product;

Product.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
    title: PropTypes.string,
  }),
};
