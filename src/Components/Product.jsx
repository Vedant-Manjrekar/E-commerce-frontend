import React, { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import axios from "../axios/axios";
import { SELECTED_PRODUCT, LOGGED_USER } from "../assets/constants/constants";

function Product({ img }) {
  const loginUser = JSON.parse(localStorage.getItem(LOGGED_USER));

  // function which returns object with all the properties of the selected item, fetched from the prop.
  function getSelectedItemProperties() {
    const selectedItem = {
      title: img.title,
      ratings: img.rating.rate,
      price: img.price,
      image: img.image,
      description: img.description,
      quantity: 1,
    };

    return selectedItem;
  }

  // Function to add product to cart.
  function addToCart() {
    const cartedItem = getSelectedItemProperties();

    // if user is not signed/logged in.
    if (loginUser == null || loginUser == "User not found") {
      alert("Please Login/Signup");
      return;
    } else {
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
  }

  // function to display selected product (more details.)
  function viewProduct() {
    localStorage.removeItem(SELECTED_PRODUCT);

    const selectedItem = getSelectedItemProperties();

    // storing the info in localstorage.
    localStorage.setItem(SELECTED_PRODUCT, JSON.stringify(selectedItem));
  }

  return (
    // Main container
    <div className="box border-2 h-auto w-50 p-4" key={Math.random()}>
      {/* Add to cart button */}
      <div className="cart cursor-pointer" onClick={addToCart}>
        <BsFillCartPlusFill size="30" className="cart_icon" />
      </div>

      {/* Product image */}
      <Link to="/selected-product">
        <img
          src={img.image}
          loading="lazy"
          onClick={viewProduct}
          className="image w-50"
          alt="product_image"
        />
      </Link>

      {/* Information about the product */}
      <div className="info">
        {/* Title */}
        <div className="">
          <div className="title font-bold">{img.title}</div>
        </div>

        {/* Ratings */}
        <div className="flex justify-between">
          <div className="ratings pl-0 flex items-center">
            <Rating
              name="half-rating-read"
              className="mr-2"
              defaultValue={img.rating.rate}
              size="small"
              precision={0.5}
              readOnly
            />
          </div>

          {/* Price */}
          <div className="price ml-2">${img.price} </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
