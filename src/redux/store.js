import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/categorySlice";
import cartSlice from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    cart: cartSlice,
  },
});

export default store;
