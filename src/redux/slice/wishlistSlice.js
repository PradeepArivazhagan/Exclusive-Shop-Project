import { createSlice } from "@reduxjs/toolkit";

let wishlistStateFromLocalStorage = JSON.parse(
  localStorage.getItem("wishlist")
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: wishlistStateFromLocalStorage,
  reducers: {
    addToFavorite: (state, action) => {
      let itemExists = state.find((item) => item.id === action.payload.id);
      if (!itemExists) {
        state.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify([...state]));
      }
    },
    removeFromFavorite: (state, action) => {
      let newWishListProducts = state.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("wishlist", JSON.stringify(newWishListProducts));
      return newWishListProducts;
    },
  },
});

export const { addToFavorite, removeFromFavorite } = wishlistSlice.actions;

export default wishlistSlice.reducer;
