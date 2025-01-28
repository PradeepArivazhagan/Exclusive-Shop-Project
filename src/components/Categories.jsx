import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import { ImHeadphones } from "react-icons/im";
import { GiHeartNecklace } from "react-icons/gi";
import { PiTShirtFill } from "react-icons/pi";
import { GiAmpleDress } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slice/categorySlice";
import { Link, useLocation } from "react-router";
const Categories = () => {
  let { pathname } = useLocation();
  let dispatch = useDispatch();
  let stateCategory = useSelector((state) => state.category);
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        let categoriesData = response.data.map((data) => {
          return data[0].toUpperCase() + data.slice(1, data.length);
        });
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickCategory = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="bg-white py-2 md:py-3 max-md:px-6 flex md:items-center md:justify-center overflow-auto gap-2 md:gap-6 lg:gap-10 rounded-xs">
      {categories.length === 0 ? (
        <div className="py-1.5">
          <ThreeDot color="#1639ff" size="small" />
        </div>
      ) : (
        categories.map((category, index) => {
          return (
            <Link
              to={`/${category.replace("'s ", "").toLowerCase()}`}
              onClick={() => onClickCategory(category)}
              key={index}
              className={`text-sm md:text-base bg-blue-50 hover:bg-blue-100 ${
                category === stateCategory && pathname !== "/"
                  ? "bg-blue-200"
                  : ""
              } py-1 px-6 rounded-full cursor-pointer flex flex-row items-center justify-center gap-2`}
            >
              {index === 0 && <ImHeadphones className="size-4" />}
              {index === 1 && <GiHeartNecklace className="size-4" />}
              {index === 2 && <PiTShirtFill className="size-4" />}
              {index === 3 && <GiAmpleDress className="size-4" />}
              {category}
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Categories;
