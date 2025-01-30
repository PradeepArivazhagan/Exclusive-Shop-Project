import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Protected from "./components/Protected";

const App = () => {
  // Ensure cart and wishlist exist in localStorage when the app loads
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    if (!localStorage.getItem("wishlist")) {
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<Protected />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/category/:categoryName" element={<Category />} />

        <Route path="/products/:id" element={<ProductDetails />} />
        
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
