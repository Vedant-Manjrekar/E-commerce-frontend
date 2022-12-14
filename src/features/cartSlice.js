import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    addToCart: (state, action) => {
      state.value = action.payload;
    },
    removeFromCart: (state, action) => {
      state.value = action.payload;
    },
    reduceQuantity: (state, action) => {
      state.value = action.payload;
    },
    increaseQuantity: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, reduceQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
