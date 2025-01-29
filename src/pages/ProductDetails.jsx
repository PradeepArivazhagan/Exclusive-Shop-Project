import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ThreeDot } from "react-loading-indicators";
import { IoIosStar } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi2";
import { GoShieldCheck } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoIosSync } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/slice/cartSlice";
import Swal from "sweetalert2";
import Cookie from "js-cookie";
import { FaRegHeart } from "react-icons/fa";
import { addToFavorite } from "../redux/slice/wishlistSlice";
// {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     "rating": {
//       "rate": 3.9,
//       "count": 120
//     }
//   }

const ProductDetails = () => {
  let jwtToken = Cookie.get("jwtToken");
  let { id } = useParams();
  let dispatch = useDispatch();
  let [productDetails, setProductDetails] = useState(null);
  let [similarProducts, setSimilarProducts] = useState([]);
  let cartProducts = useSelector((state) => state.cart);
  let wishlistProducts = useSelector((state) => state.wishlist);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProductDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const fetchSimilarProducts = () => {
    axios
      .get(
        `https://fakestoreapi.com/products/category/${productDetails.category}?limit=5`
      )
      .then((response) => {
        setSimilarProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddToCart = (product) => {
    if (jwtToken !== undefined) {
      let check = cartProducts.find(
        (cartProduct) => cartProduct.id === product.id
      );
      if (check) {
        Swal.fire({
          title: "Item Already Exists in Cart!",
          text: "You already added this product to cart!",
          icon: "warning",
        });
        return;
      } else {
        dispatch(addItem(product));
        Swal.fire({
          title: "Item Added to Cart!",
          text: "More Product Waiting for you Shop Now!",
          icon: "success",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login to Continue!",
      });
    }
  };

  const handleFavorite = (product) => {
    if (jwtToken !== undefined) {
      let check = wishlistProducts.find(
        (wishlistProduct) => wishlistProduct.id === product.id
      );
      if (check) {
        Swal.fire({
          title: "Item Already Exists in Wishlist!",
          text: "You already added this product to wishlist!",
          icon: "warning",
        });
        return;
      } else {
        dispatch(addToFavorite(product));
        Swal.fire({
          title: "Item Added to Wishlist!",
          text: "More Product Waiting for you Shop Now!",
          icon: "success",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login to Continue!",
      });
    }
  };

  if (productDetails !== null) {
    fetchSimilarProducts();
  }

  return (
    <div className="bg-slate-100 min-h-lvh pt-19 pb-10 md:pt-20 lg:px-28">
      <section className="bg-white rounded-xs">
        {productDetails === null ? (
          <div className="min-h-lvh flex justify-center items-center">
            <ThreeDot color="#1639ff" size="small" />
          </div>
        ) : (
          <div className="p-4 flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/2 p-4 md:p-0 lg:p-4 border-2 border-slate-50 rounded-md flex flex-row items-center justify-center">
              <p className="absolute top-2 left-2 text-sm lg:text-base bg-violet-600 text-white font-semibold py-1 px-2 rounded-md">
                35% OFF
              </p>
              <button
                onClick={() => handleFavorite(productDetails)}
                className="absolute right-2.5 top-2.5 p-2 bg-slate-200 hover:bg-red-200 cursor-pointer text-white text-2xl rounded-full"
              >
                <FaRegHeart />
              </button>
              <center>
                <img
                  className="w-[50%] md:w-[70%] lg:w-[50%]"
                  src={productDetails.image}
                  alt={productDetails.title}
                />
              </center>
            </div>
            <div className="border border-slate-50 w-full md:w-1/2 px-2 md:px-4 lg:px-6 py-4">
              <h1 className="text-lg md:text-xl lg:text-2xl">
                {productDetails.title}
              </h1>
              <div className="my-4 flex flex-row items-center gap-3">
                <span className="py-1 px-2 rounded-sm bg-green-700 text-xs font-semibold text-white flex flex-row items-center gap-1">
                  {productDetails.rating.rate}
                  <IoIosStar />
                </span>
                <span className="text-slate-600 font-semibold text-sm">
                  {productDetails.rating.count} Ratings
                </span>
              </div>
              <p className="my-3 text-xl md:text-2xl lg:text-3xl font-semibold">
                ₹ {productDetails.price * 30}
              </p>
              <p className="text-sm lg:text-base">
                {productDetails.description.slice(0, 145) + "..."}
              </p>
              <p className="font-semibold text-yellow-400 mt-4">
                From{" "}
                {productDetails.category[0].toUpperCase() +
                  productDetails.category.slice(
                    1,
                    productDetails.category.length
                  )}
              </p>
              <div className="mt-4 flex flex-row items-center gap-2">
                <IoShieldCheckmark className="size-7 text-yellow-500 drop-shadow-xs" />
                <p className="text-sm text-blue-600 drop-shadow-xs font-semibold italic">
                  Seal of Quality & Speed
                </p>
              </div>
              <div className="my-4 flex flex-row items-center gap-2 lg:gap-4">
                <button className="w-1/2 cursor-pointer bg-orange-600 hover:bg-orange-500 py-5 rounded-sm text-white text-sm md:text-base lg:text-lg flex flex-row items-center justify-center gap-1">
                  <MdPayment className="size-6" />
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(productDetails)}
                  className="w-1/2 cursor-pointer bg-slate-50 hover:bg-slate-100 py-5 rounded-sm text-sm md:text-base lg:text-lg border border-slate-400  flex flex-row items-center justify-center gap-1"
                >
                  <HiShoppingCart />
                  Add to Cart
                </button>
              </div>
              <div className="mt-4 py-4 grid grid-cols-3 rounded-md bg-slate-50 text-slate-500">
                <div className="flex flex-col items-center justify-center">
                  <BsTruck className="size-6 lg:size-8" />
                  <p className="px-2 mt-1 text-center  text-xs lg:text-sm">
                    Fast,Safe & On Time Delivery
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-x border-slate-200">
                  <IoIosSync className="size-6 lg:size-8" />
                  <p className="px-2 mt-1 text-center text-xs lg:text-sm">
                    7 Days Return or Replacement
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <GoShieldCheck className="size-6 lg:size-8" />
                  <p className="px-2 mt-1 text-center  text-xs lg:text-sm">
                    Safe and Secure Payments
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="mt-4 bg-white rounded-xs">
        <div className="p-4">
          <h2 className="text-lg md:text-2xl font-semibold">
            Similar Products
          </h2>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {similarProducts.length > 0 ? (
              similarProducts.map((product) => (
                <Product key={product.id} productDetails={product} />
              ))
            ) : (
              <div className="min-h-60 w-full flex justify-center items-center">
                <ThreeDot color="#1639ff" size="small" />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
