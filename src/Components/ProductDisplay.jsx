import React from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Rating } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "../axios/axios.js";
import { useState, useEffect } from "react";
import { LOGGED_USER, SELECTED_PRODUCT } from "../assets/constants/constants";

function ProductDisplay() {
  const selectedProduct = JSON.parse(localStorage.getItem(SELECTED_PRODUCT));
  const loginUser = JSON.parse(localStorage.getItem(LOGGED_USER));
  const [user, setUser] = useState(null);

  // whether to display users name or not.
  useEffect(() => {
    if (loginUser == null || loginUser == "User not found") {
      setUser(false);
      return;
    } else {
      setUser(true);
    }
    console.log(user);
  }, []);

  // function to add to cart.
  function addToCart() {
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

    axios
      .post("/addToCart", {
        email: loginUser.email,
        order: cartedItem,
      })
      .then((data) => {
        localStorage.removeItem(LOGGED_USER);
        localStorage.setItem(LOGGED_USER, JSON.stringify(data.data));
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="s-prod">
        {/* navbar for product display. */}
        <div className="disp_nav">
          {/* back button */}
          <Link to="/" className="disp_back">
            <BiArrowBack size={"3vh"} />
          </Link>

          {/* cart button */}
          <Link to="/cart" className="disp_cart">
            <AiOutlineShoppingCart size={"3vh"} />
          </Link>
        </div>

        <div className="selected-product grid place-items-center border-2">
          {/* image */}
          <img
            src={selectedProduct.image}
            className="selected-product-image"
            alt=""
          />

          {/* title */}
          <div className="name pl-2 flex">
            <div className="flex head">
              {selectedProduct.title}

              {/* add to cart */}
              <div
                className="cart_icon1"
                onClick={addToCart}
                style={{ display: user ? "block" : "none" }}
              >
                <BsFillCartPlusFill />
              </div>
            </div>

            {/* price, cart, ratings */}
            <div className="rate-price flex justify-between items-center">
              <div className="rating_sm">
                <Rating
                  name="half-rating-read"
                  className="mr-2"
                  defaultValue={selectedProduct.ratings}
                  precision={0.5}
                  readOnly
                />
              </div>
              <div className="price text-3xl">${selectedProduct.price}</div>
            </div>
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
