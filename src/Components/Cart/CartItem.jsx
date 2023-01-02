import axios from "../../axios/axios";
import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsFillCartDashFill } from "react-icons/bs";
import { LOGGED_USER } from "../../assets/constants/constants";

function CartItem({ prod, key }) {
  const user = JSON.parse(localStorage.getItem(LOGGED_USER));

  function setLocalState(key, data) {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(data.data));

    // Dispatching a storage event to signal change in localstorage.
    let event = new Event("storage");
    window.dispatchEvent(event);
  }

  // Function to remove a cart item.
  function deleteItem() {
    // filters the all the items not matching the cartItem prop.
    const removedItemList = user.order.filter(
      (item) => item.title !== prod.title
    );

    axios
      .post("/removeFromCart", {
        email: user.email,
        order: removedItemList,
      })
      .then((data) => {
        // setting info to the localstorage.
        setLocalState(LOGGED_USER, data);
      })
      .catch((err) => console.log(err));
  }

  // function to increase the quantity of the cart items.
  function addQuantity() {
    const add = user.order.map((elem) => {
      return elem.title === prod.title
        ? { ...elem, quantity: elem.quantity + 1 }
        : elem;
    });

    axios
      .post("/increaseQuantity", {
        email: user.email,
        order: add,
      })
      .then((data) => {
        // setting info to the localstorage.
        setLocalState(LOGGED_USER, data);
      })
      .catch((err) => console.log(err));
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
        setLocalState(LOGGED_USER, data);
      })
      .catch((err) => console.log(err));
  }

  return (
    // parent div
    <div className="border-2 flex p-5 justify-around" key={key}>
      {/* Image */}
      <img src={prod.image} className="cart-img inline" alt="image" />

      {/* Title and Description */}
      <div className="desc p-3 h-full flex w-6/12 items-center">
        <h2 className="cart_title inline font-bold">{prod.title}</h2>
      </div>

      {/* Price */}
      <div className="price flex items-center justify-evenly flex-col">
        {/* Delete Item button */}
        <BsFillCartDashFill onClick={deleteItem} size="20%" />

        {/* Price */}
        <p className="text-xl">${prod.price}</p>

        {/* Add or subtract quantity. */}
        <div className="no-of-items flex">
          {/* Decrease Quantity */}
          <button className="cart_btn p-3 rounded-md bg-red-300 flex justify-center items-center">
            <AiOutlineMinus onClick={decreaseQuantity} />
          </button>

          {/* Actual Quantity */}
          <div className="quantity p-2">{prod.quantity}</div>

          {/* Increase Quantity */}
          <button className="cart_btn p-3 rounded-md bg-green-300 flex justify-center items-center">
            <AiOutlinePlus onClick={addQuantity} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
