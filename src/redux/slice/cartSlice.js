import { createSlice } from "@reduxjs/toolkit";

let cartStateFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
  name: "cart",
  initialState: cartStateFromLocalStorage,
  reducers: {
    addItem: (state, action) => {
      let itemExists = state.find((item) => item.id === action.payload.id);
      if (!itemExists) {
        state.push(action.payload);
        localStorage.setItem("cart", JSON.stringify([...state]));
      }
    },
    removerItem: (state, action) => {
      let newCartProductList = state.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(newCartProductList));
      return newCartProductList;
    },
  },
});

export const { addItem, removerItem } = cartSlice.actions;

export default cartSlice.reducer;
