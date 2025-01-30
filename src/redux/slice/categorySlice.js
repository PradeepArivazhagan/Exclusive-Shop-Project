import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: "", // Initial state is an empty string
  reducers: {
    setCategory: (state, action) => {
      return action.payload; // Directly return the new value
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;