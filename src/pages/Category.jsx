import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "../components/Categories";
import Product from "../components/Product";
import { ThreeDot } from "react-loading-indicators";

const Category = () => {
  let [productList, setProductList] = useState([]);
  let category = useSelector((state) => state.category);

  useEffect(() => {
    axios
      .get(
        `https://fakestoreapi.com/products/category/${
          category !== undefined
            ? category[0].toLowerCase() + category.slice(1, category.length)
            : ""
        }`
      )
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  return (
    <div className="bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28">
      <Categories />
      <section className="my-2 md:my-4 min-h-lvh bg-white rounded-xs">
        {/* <h1 className="text-2xl font-semibold">Best Products</h1> */}
        {productList.length === 0 ? (
          <div className="min-h-lvh flex justify-center items-center">
            <ThreeDot color="#1639ff" size="small" />
          </div>
        ) : (
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productList.map((product) => (
              <Product key={product.id} productDetails={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Category;
