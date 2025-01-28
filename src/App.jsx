import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Header from "./components/Header";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Protected from "./components/Protected";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<Protected />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route exact path="/electronics" element={<Category />} />
        <Route exact path="/jewelery" element={<Category />} />
        <Route exact path="/menclothing" element={<Category />} />
        <Route exact path="/womenclothing" element={<Category />} />
        <Route exact path="/products/:id" element={<ProductDetails />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
