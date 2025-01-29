import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/categorySlice";
import cartSlice from "./slice/cartSlice";
import wishlistSlice from "./slice/wishlistSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
});

export default store;
