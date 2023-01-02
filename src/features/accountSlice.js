import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: { value: false },
  reducers: {
    accountVisibility: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { accountVisibility } = accountSlice.actions;
export default accountSlice;
