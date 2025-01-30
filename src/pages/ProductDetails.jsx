import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDot } from "react-loading-indicators";
import Swal from "sweetalert2";
import Cookie from "js-cookie";

import { IoIosStar, IoIosSync } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi2";
import { GoShieldCheck } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { BsTruck } from "react-icons/bs";
import { FaHeart,FaRegHeart } from "react-icons/fa";

import Product from "../components/Product";
import { addItem } from "../redux/slice/cartSlice";
import { addToFavorite } from "../redux/slice/wishlistSlice";

const ProductDetails = () => {
  const jwtToken = Cookie.get("jwtToken");
  const { id } = useParams();
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cart);
  const wishlistProducts = useSelector((state) => state.wishlist);

  const [productDetails, setProductDetails] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Fetch similar products
  useEffect(() => {
    if (!productDetails?.category) return;

    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${productDetails.category.toLowerCase()}?limit=5`
        );
        setSimilarProducts(response.data);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };
    fetchSimilarProducts();
  }, [productDetails?.category]);

  // Helper function to check if an item exists in a list
  const isItemInList = (list, itemId) =>
    list.some((item) => item.id === itemId);

  // Handle adding to cart
  const handleAddToCart = (product) => {
    if (!jwtToken) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login to Continue!",
      });
    }
    if (isItemInList(cartProducts, product.id)) {
      return Swal.fire({
        title: "Item Already in Cart!",
        text: "You already added this product to cart!",
        icon: "warning",
      });
    }
    dispatch(addItem(product));
    Swal.fire({
      title: "Item Added to Cart!",
      text: "More products are waiting for you!",
      icon: "success",
    });
  };

  // Handle adding to wishlist
  const handleFavorite = (product) => {
    if (!jwtToken) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login to Continue!",
      });
    }
    if (isItemInList(wishlistProducts, product.id)) {
      return Swal.fire({
        title: "Item Already in Wishlist!",
        text: "You already added this product to wishlist!",
        icon: "warning",
      });
    }
    dispatch(addToFavorite(product));
    Swal.fire({
      title: "Item Added to Wishlist!",
      text: "More products are waiting for you!",
      icon: "success",
    });
  };

  // Display loading state
  if (!productDetails) {
    return (
      <div className="min-h-lvh flex justify-center items-center">
        <ThreeDot color="#1639ff" size="small" />
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-lvh pt-19 pb-10 md:pt-20 lg:px-28">
      <section className="bg-white rounded-xs p-4 flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 p-4 border-2 border-slate-50 rounded-md flex justify-center items-center">
          <p className="absolute top-2 left-2 text-sm lg:text-base bg-violet-600 text-white font-semibold py-1 px-2 rounded-md">
            35% OFF
          </p>
          <button
            onClick={() => handleFavorite(productDetails)}
            className="absolute right-2.5 top-2.5 p-2 bg-slate-200 hover:bg-red-200 cursor-pointer text-2xl rounded-full"
          >
            {wishlistProducts.some(
              (product) => product.id === productDetails.id
            ) ? (
              <FaHeart fill="red"/>
            ) : (
              <FaRegHeart />
            )}
          </button>
          <img
            className="w-[50%] md:w-[70%] lg:w-[50%]"
            src={productDetails.image}
            alt={productDetails.title}
          />
        </div>

        {/* Product Details */}
        <div className="border border-slate-50 w-full md:w-1/2 px-4 py-4">
          <h1 className="text-lg md:text-xl lg:text-2xl">
            {productDetails.title}
          </h1>
          <div className="my-4 flex items-center gap-3">
            <span className="py-1 px-2 rounded-sm bg-green-700 text-xs font-semibold text-white flex items-center gap-1">
              {productDetails.rating.rate} <IoIosStar />
            </span>
            <span className="text-slate-600 font-semibold text-sm">
              {productDetails.rating.count} Ratings
            </span>
          </div>
          <p className="my-3 text-xl md:text-2xl lg:text-3xl font-semibold">
            ₹ {productDetails.price * 30}
          </p>
          <p className="text-sm lg:text-base">
            {productDetails.description.slice(0, 145)}...
          </p>
          <p className="font-semibold text-yellow-400 mt-4">
            From{" "}
            {productDetails.category.charAt(0).toUpperCase() +
              productDetails.category.slice(1)}
          </p>
          <div className="mt-4 flex flex-row items-center gap-2">
            <IoShieldCheckmark className="size-7 text-yellow-500 drop-shadow-xs" />
            <p className="text-sm text-blue-600 drop-shadow-xs font-semibold italic">
              Seal of Quality & Speed
            </p>
          </div>

          {/* Action Buttons */}
          <div className="my-4 flex gap-4">
            <button className="w-1/2 bg-orange-600 hover:bg-orange-500 py-5 rounded-sm text-white flex items-center justify-center gap-1">
              <MdPayment className="size-6" /> Buy Now
            </button>
            <button
              onClick={() => handleAddToCart(productDetails)}
              className="w-1/2 bg-slate-50 hover:bg-slate-100 py-5 rounded-sm border border-slate-400 flex items-center justify-center gap-1"
            >
              <HiShoppingCart /> Add to Cart
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
