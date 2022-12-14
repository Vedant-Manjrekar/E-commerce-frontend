import { createSlice } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
  name: "selectedProduct",
  initialState: { value: {} },
  reducers: {
    addProduct: (state, action) => {
      state.value = action.payload;
    },
    removeProduct: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addProduct, removeProduct } = selectedSlice.actions;

export default selectedSlice.reducer;
