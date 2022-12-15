import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartSlice from "./features/cartSlice";
import { BrowserRouter, HashRouter } from "react-router-dom";
import selectedSlice from "./features/selectedSlice";
import loginUserSlice from "./features/loginUserSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: selectedSlice,
    login: loginUserSlice,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
