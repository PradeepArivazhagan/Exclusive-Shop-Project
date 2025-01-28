import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import axios from "axios";
import Product from "../components/Product";
import { ThreeDot } from "react-loading-indicators";
// let object = {
//   id: 9,
//   image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//   price: 64,
//   rating: { rate: 3.3, count: 203 },
//   title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
// };

const Home = () => {
  let [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then((response) => {
        let productsData = response.data.map((product) => ({
          image: product.image,
          title: product.title,
          price: product.price,
          id: product.id,
          rating: { rate: product.rating.rate, count: product.rating.count },
        }));
        setProductList(productsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

export default Home;
