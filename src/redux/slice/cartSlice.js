import { createSlice } from "@reduxjs/toolkit";

// Safely retrieve cart state from localStorage
const getCartStateFromLocalStorage = () => {
  try {
    const cartState = localStorage.getItem("cart");
    return cartState ? JSON.parse(cartState) : [];
  } catch (error) {
    console.error("Error parsing cart state from localStorage:", error);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartStateFromLocalStorage(), // Initialize with localStorage data
  reducers: {
    addItem: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (!itemExists) {
        const newState = [...state, action.payload]; // Create a new array with the added item
        try {
          localStorage.setItem("cart", JSON.stringify(newState));
        } catch (error) {
          console.error("Error saving cart state to localStorage:", error);
        }
        return newState;
      }
      return state; // Return unchanged state if item already exists
    },
    removeItem: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload); // Filter out the item to remove
      try {
        localStorage.setItem("cart", JSON.stringify(newState));
      } catch (error) {
        console.error("Error saving cart state to localStorage:", error);
      }
      return newState;
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;