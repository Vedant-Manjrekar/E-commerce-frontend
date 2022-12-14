import { createSlice } from "@reduxjs/toolkit";

const loginUserSlice = createSlice({
  name: "login",
  initialState: { value: null },
  reducers: {
    addUserEmail: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addUserEmail } = loginUserSlice.actions;
export default loginUserSlice.reducer;
