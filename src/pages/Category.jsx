import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Categories from "../components/Categories";
import Product from "../components/Product";
import { ThreeDot } from "react-loading-indicators";

const Category = () => {
  const { categoryName } = useParams(); // Get category from URL
  const [productList, setProductList] = useState(null);
  const [error, setError] = useState("");

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setProductList(null);
      setError("");

      const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryName.toLowerCase()}`);
      setProductList(response.data);
    } catch (err) {
      console.log(err)
      setError("Failed to load products. Please try again.");
    }
  };

  useEffect(() => {
    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName]);

  return (
    <div className="bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28">
      <Categories />
      <section className="my-2 md:my-4 min-h-lvh bg-white rounded-xs">
        {error ? (
          <div className="min-h-lvh flex justify-center items-center text-red-600">
            {error}
          </div>
        ) : productList === null ? (
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
