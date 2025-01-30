import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "../components/Categories";
import Product from "../components/Product";
import { ThreeDot } from "react-loading-indicators";

const Home = () => {
  const [productList, setProductList] = useState(null);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/");
      const productsData = response.data.map((product) => ({
        image: product.image,
        title: product.title,
        price: product.price,
        id: product.id,
        rating: { rate: product.rating.rate, count: product.rating.count },
      }));
      setProductList(productsData);
    } catch (error) {
      console.log(error);
      setError("Failed to load products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

export default Home;
