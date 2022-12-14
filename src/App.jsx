import React from "react";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import ProductDisplay from "./Components/ProductDisplay";
import CheckOut from "./Components/CheckOut";
import Orders from "./Components/Orders";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/selected-product" element={<ProductDisplay />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
