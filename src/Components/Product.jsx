import React, { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { addProduct, removeProduct } from "../features/selectedSlice";
import { Rating } from "@mui/material";
import axios from "../axios/axios";
import { useEffect } from "react";

function Product({ img }) {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.cart.value);
  // const [globalState, setGlobalState] = useState();
  const selectedProd = useSelector((state) => state.product.value);
  const loginUser = JSON.parse(localStorage.getItem("user"));

  function getInfo() {
    const cartedItem = {
      title: img.title,
      ratings: img.rating.rate,
      price: img.price,
      image: img.image,
      description: img.description,
      quantity: 1,
    };

    if (loginUser == null || loginUser == "User not found") {
      alert("Please Login/Signup");
      return;
    }

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

  function lookProduct() {
    localStorage.removeItem("selected-product");

    const selectedItem = {
      title: img.title,
      ratings: img.rating.rate,
      price: img.price,
      image: img.image,
      description: img.description,
      quantity: 1,
    };

    localStorage.setItem("selected-product", JSON.stringify(selectedItem));
  }

  return (
    <div className="box border-2 h-auto w-50 p-4" key={Math.random()}>
      <div className="cart cursor-pointer" onClick={getInfo}>
        <BsFillCartPlusFill size="30" className="cart_icon" />
      </div>
      <Link to="/selected-product">
        <img
          src={img.image}
          onClick={lookProduct}
          className="image w-50"
          alt="product_image"
        />
      </Link>
      <div className="info">
        <div className="flex items-center">
          <div className="title font-bold">{img.title}</div>
        </div>

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
            {/* <div className="rating">({img.rating.rate})</div> */}
          </div>
          <div className="price ml-2">${img.price} </div>
        </div>
        {/* <div className="description">{img.description} </div> */}
      </div>
    </div>
  );
}

export default Product;
