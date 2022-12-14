import axios from "../../axios/axios";
import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsFillCartDashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  reduceQuantity,
} from "../../features/cartSlice";

function CartItem({ prod, key }) {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.cart.value);
  const user = JSON.parse(localStorage.getItem("user"));

  function deleteItem() {
    const removedItemList = user.order.filter(
      (item) => item.title !== prod.title
    );

    dispatch(removeFromCart([...removedItemList]));

    console.log(removedItemList);
    console.log(user.order);

    axios
      .post("/removeFromCart", {
        email: user.email,
        order: removedItemList,
      })
      .then((data) => {
        console.log(data.data);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data.data));

        let event = new Event("storage");
        window.dispatchEvent(event);
      })
      .catch((err) => console.log(err));
  }

  function addQuantity() {
    const add = user.order.map((elem) => {
      return elem.title === prod.title
        ? { ...elem, quantity: elem.quantity + 1 }
        : elem;
    });

    console.log(add);

    axios
      .post("/increaseQuantity", {
        email: user.email,
        order: add,
      })
      .then((data) => {
        console.log(data.data);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data.data));

        // * for forcing a storage event trigger.
        let event = new Event("storage");
        window.dispatchEvent(event);
      })
      .catch((err) => console.log(err));

    dispatch(increaseQuantity([...add]));
  }

  function decreaseQuantity() {
    const subtract = user.order.map((elem) => {
      return elem.title === prod.title
        ? { ...elem, quantity: elem.quantity - 1 }
        : elem;
    });

    axios
      .post("/increaseQuantity", {
        email: user.email,
        order: subtract,
      })
      .then((data) => {
        console.log(data.data);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data.data));

        let event = new Event("storage");
        window.dispatchEvent(event);
      })
      .catch((err) => console.log(err));

    dispatch(reduceQuantity([...subtract]));
  }

  return (
    // // parent div
    <div className="border-2 flex p-5 justify-around" key={key}>
      {/* // // Image */}
      <img src={prod.image} className="cart-img inline" alt="" />

      {/* // // Title and Description */}
      <div className="desc p-3 h-full flex w-6/12 items-center">
        <h2 className="inline font-bold">{prod.title}</h2>
        {/* <h2 className="py-4">{prod.description}</h2> */}
      </div>

      {/* // // Price */}
      <div className="price flex items-center justify-evenly flex-col">
        <BsFillCartDashFill onClick={deleteItem} size="20%" />
        <p className="text-xl">$ {prod.price}</p>
        <div className="no-of-items flex">
          <button className="p-3 rounded-md bg-red-300 flex justify-center items-center">
            <AiOutlineMinus onClick={decreaseQuantity} />
          </button>
          <div className="quantity p-2">{prod.quantity}</div>
          <button className="p-3 rounded-md bg-green-300 flex justify-center items-center">
            <AiOutlinePlus onClick={addQuantity} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
