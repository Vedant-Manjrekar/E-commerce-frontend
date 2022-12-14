import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { BiArrowBack } from "react-icons/bi";
import axios from "../../axios/axios";

function Cart() {
  const user = JSON.parse(localStorage?.getItem("user"));
  const globalState = useSelector((state) => state.cart.value);
  const [loginUser, setLoginUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  let sum = 0;
  console.log(globalState);
  console.log(user?.order);

  window.addEventListener("storage", () => {
    setLoginUser(JSON.parse(localStorage.getItem("user")));
  });

  useEffect(() => {
    axios.post("/unique", {
      email: loginUser.email,
      order: unique,
    });
  }, []);

  // ! Logic for removing duplicate cart items.

  // * Array to store unique object names.
  const uniqueArr = [];

  // * filtering globalstate array.
  const unique = loginUser?.order?.filter((prod) => {
    // * boolean flag to see whether "uniqueArr" already has the current objects title.
    const isDuplicate = uniqueArr.includes(prod.title);

    // // if "uniqueArr" does not have the current objects title.
    if (!isDuplicate) {
      // * Adds the current object's title to "uniqueArr"
      uniqueArr.push(prod.title);

      // * stores the current object in "unique"
      return true;
    }
    // // if "uniqueArr" has the current objects title.
    else {
      // * Adds nothing to the 'unique'
      return false;
    }
  });

  console.log(unique);

  return (
    <div className="cart">
      {/* // // Cart Heading */}
      <div className="grid grid-cols-3 justify-evenly items-center border-none fixed w-full bg-slate-50 top-0">
        <Link to="/" className="ml-2">
          <BiArrowBack size={"2vw"} />
        </Link>
        <p className="cart-heading p-4 text-center inline text-2xl">
          Your Cart
        </p>
        <div className="flex items-center justify-end">
          <p className="bg-green-400 inline-block p-2 rounded-md mr-3 text-white">
            <Link to="/checkout"> Checkout Now</Link>
          </p>
        </div>
      </div>

      {/* // // Cart Elements */}
      <div className="grid h-max mt-10">
        {unique ? (
          unique.length > 0 ? (
            unique.map((prod) => {
              sum += prod.price * prod.quantity;
              return <CartItem key={prod._id} prod={prod} />;
            })
          ) : (
            <div className="empty">
              <h1 className="empty-cart">Your Cart is Empty</h1>
              <Link to="/" className="p-5 text-white bg-green-400 rounded-md">
                Continue Shopping...
              </Link>
            </div>
          )
        ) : (
          <p className="mt-12">Please Login</p>
        )}
      </div>

      {/* // // Total Amount */}
      <CartTotal amount={sum} />
    </div>
  );
}

export default Cart;
