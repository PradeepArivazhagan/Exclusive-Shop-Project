import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely parse localStorage data
const getWishlistStateFromLocalStorage = () => {
  try {
    const wishlistState = localStorage.getItem("wishlist");
    return wishlistState ? JSON.parse(wishlistState) : [];
  } catch (error) {
    console.error("Error parsing wishlist state from localStorage:", error);
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: getWishlistStateFromLocalStorage(), // Initialize with localStorage data
  reducers: {
    addToFavorite: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (!itemExists) {
        const newState = [...state, action.payload]; // Create a new array with the added item
        try {
          localStorage.setItem("wishlist", JSON.stringify(newState));
        } catch (error) {
          console.error("Error saving wishlist state to localStorage:", error);
        }
        return newState;
      }
      return state; // Return unchanged state if item already exists
    },
    removeFromFavorite: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload); // Filter out the item to remove
      try {
        localStorage.setItem("wishlist", JSON.stringify(newState));
      } catch (error) {
        console.error("Error saving wishlist state to localStorage:", error);
      }
      return newState;
    },
  },
});

export const { addToFavorite, removeFromFavorite } = wishlistSlice.actions;

export default wishlistSlice.reducer;