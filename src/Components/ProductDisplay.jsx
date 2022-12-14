import React from "react";
import { useSelector } from "react-redux";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Rating } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import Footer from "./Footer";
import axios from "../axios/axios.js";
import { useState } from "react";
import { display } from "@mui/system";
import { useEffect } from "react";

function ProductDisplay() {
  const selectedProduct = JSON.parse(localStorage.getItem("selected-product"));
  const allProducts = useSelector((state) => state.cart.value);
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(null);

  console.log(selectedProduct);

  useEffect(() => {
    if (loginUser == null || loginUser == "User not found") {
      setUser(false);
      return;
    } else {
      setUser(true);
    }
    console.log(user);
  }, []);

  function getInfo() {
    if (loginUser == null || loginUser == "User not found") {
      setUser(false);
      alert("Please Login/Signup");
      return;
    } else {
      setUser(true);
    }

    const cartedItem = {
      title: selectedProduct.title,
      ratings: selectedProduct.rating,
      price: selectedProduct.price,
      image: selectedProduct.image,
      description: selectedProduct.description,
      quantity: 1,
    };

    console.log(loginUser.email);
    console.log(selectedProduct);

    axios
      .post("/addToCart", {
        email: loginUser.email,
        order: cartedItem,
      })
      .then((data) => {
        console.log(data);
        console.log(data.data);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data.data));
      })
      .catch((err) => console.log(err));
  }

  console.log(allProducts);

  return (
    <>
      <div className="s-prod m-5">
        <Link to="/" className="left-4 top-4 absolute">
          <BiArrowBack size={"3vw"} />
        </Link>
        <Link to="/cart" className="right-4 top-4 absolute">
          <AiOutlineShoppingCart size={"3vw"} />
        </Link>
        <div className="selected-product grid place-items-center border-2">
          {/* image */}
          <img
            src={selectedProduct.image}
            className="selected-product-image"
            alt=""
          />
          {/* name */}
          <div className="name pl-2 flex justify-between">
            {selectedProduct.title}
            <div
              className="cart_icon"
              onClick={getInfo}
              style={{ display: user ? "block" : "none" }}
            >
              <BsFillCartPlusFill />
            </div>
          </div>
          {/* price, cart, ratings */}
          <div className="rate-price flex justify-between items-center">
            <div className="rating flex items-center">
              <Rating
                name="half-rating-read"
                className="mr-2"
                defaultValue={selectedProduct.ratings}
                precision={0.5}
                readOnly
              />
              ({selectedProduct.ratings})
            </div>
            <div className="price text-3xl mr-3">$ {selectedProduct.price}</div>
          </div>
          {/* description */}
          <div className="description">{selectedProduct.description}.</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDisplay;
