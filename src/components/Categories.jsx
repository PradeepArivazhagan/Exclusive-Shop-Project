import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import { ImHeadphones } from "react-icons/im";
import { GiHeartNecklace } from "react-icons/gi";
import { PiTShirtFill } from "react-icons/pi";
import { GiAmpleDress } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slice/categorySlice";
import { Link, useLocation } from "react-router-dom"; // Fixed import

const Categories = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map categories to their respective icons
  const categoryIcons = {
    electronics: <ImHeadphones className="size-4" />,
    jewelery: <GiHeartNecklace className="size-4" />,
    "men's clothing": <PiTShirtFill className="size-4" />,
    "women's clothing": <GiAmpleDress className="size-4" />,
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        const formattedCategories = response.data.map(
          (category) => category[0].toUpperCase() + category.slice(1)
        );
        setCategories(formattedCategories);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle category click
  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <ThreeDot color="#1639ff" size="small" />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center py-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white py-2 md:py-3 max-md:px-6 flex md:items-center md:justify-center overflow-auto gap-2 md:gap-6 lg:gap-10 rounded-xs">
      {categories.map((category, index) => {
        const lowercaseCategory = category.toLowerCase();
        const isActive = lowercaseCategory === selectedCategory && pathname !== "/";

        return (
          <Link
            to={`/category/${lowercaseCategory}`}
            onClick={() => handleCategoryClick(lowercaseCategory)}
            key={index}
            className={`text-sm md:text-base bg-blue-50 hover:bg-blue-100 ${
              isActive ? "bg-blue-200" : ""
            } py-1 px-6 rounded-full cursor-pointer flex flex-row items-center justify-center gap-2`}
          >
            {categoryIcons[lowercaseCategory]} {/* Render icon based on category */}
            {category}
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;