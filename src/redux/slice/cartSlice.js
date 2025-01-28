import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      let itemExists = state.find((item) => item.id === action.payload.id);
      if (!itemExists) {
        state.push(action.payload);
      }
    },
    removerItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removerItem } = cartSlice.actions;

export default cartSlice.reducer;
