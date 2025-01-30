import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slice/categorySlice";
import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
