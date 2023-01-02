import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "../axios/axios.js";
import OrderItem from "./OrderItem";
import { LOGGED_USER } from "../assets/constants/constants";

function CheckOut() {
  const [placeButton, setPlaceButton] = useState(null);
  const loginUser = JSON.parse(localStorage.getItem(LOGGED_USER));
  const navigate = useNavigate();

  // referances to form fields
  const house = useRef(null);
  const street = useRef(null);
  const landmark = useRef(null);
  const pincode = useRef(null);

  // When to display form
  const formStyle = {
    display: loginUser.address ? "none" : "grid",
  };

  // when to display place order Button.
  const isVisble = {
    display: placeButton ? "block" : "none",
  };

  // function to set local state.
  function setLocalState(key, data) {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(data.data));
  }

  // function to place order.
  function placeOrder() {
    // Place order onlt if all the form fields are filled.
    if (
      house.current.value &&
      landmark.current.value &&
      street.current.value &&
      pincode.current.value
    ) {
      alert("Order Placed Successfully.");
      navigate("/");
    } else {
      alert("Please fill all the details");
      return;
    }

    // if localstate already has an address.
    if (loginUser.address) {
      axios
        .post("/checkout", {
          name: loginUser.name,
          email: loginUser.email,
          order: [],
          final_order: [...loginUser.final_order, ...loginUser.order],
          address: { ...loginUser.address },
        })
        .then((res) => {
          // updating local state (through localstorage)
          setLocalState(LOGGED_USER, res);

          alert("Order Placed Successfully.");
          navigate("/");
        })
        .catch((error) => alert(error.message));
    }

    // if localstate doesn't have an address then save it.
    else {
      axios
        .post("/checkout", {
          name: loginUser.name,
          email: loginUser.email,
          order: [],
          final_order: [...loginUser.final_order, ...loginUser.order],
          address: {
            house_no: house.current.value,
            street: street.current.value,
            landmark: landmark.current.value,
            pincode: pincode.current.value,
          },
        })
        .then((res) => {
          setLocalState(LOGGED_USER, res);
        })
        .catch((error) => alert(error.message));
    }
  }

  // Logic to decide when to keep / remove place order button.
  useEffect(() => {
    if (loginUser.order.length == 0) {
      setPlaceButton(false);
    } else {
      setPlaceButton(true);
    }
  }, []);

  return (
    // main page
    <>
      <div className="checkout m-2 p-5">
        {/* if address is provided by user, show checkout items */}
        {loginUser.address ? (
          // if cart is not empty, show items.
          loginUser.order.length > 0 ? (
            loginUser.order.map((item) => {
              return <OrderItem order={item} />;
            })
          ) : (
            // else show Emptiness message.
            <p className="text-center m-6">Your cart is empty.</p>
          )
        ) : (
          // if address is not provided (asks to fill address).
          <>
            {/* Form heading */}
            <p className="checkout-head text-center" style={formStyle}>
              To proceed, please add your delivery address.
            </p>

            {/* Form */}
            <form className="form" style={formStyle}>
              <input
                ref={house}
                className="border border-slate-400 p-4 rounded-sm"
                type="text"
                placeholder="House / Flat / Plot Number."
              />
              <input
                ref={street}
                className="border border-slate-400 p-4 rounded-sm"
                type="text"
                placeholder="Street / Locality Name."
              />
              <input
                ref={landmark}
                className="border border-slate-400 p-4 rounded-sm"
                type="text"
                placeholder="Landmark"
              />
              <input
                ref={pincode}
                className="border border-slate-400 p-4 rounded-sm"
                type="number"
                placeholder="Pincode"
              />
            </form>
          </>
        )}
      </div>

      {/* Go to cart and place order button */}
      <div className="w-full text-center my-5 flex justify-center gap-3">
        <Link
          to="/cart"
          className="place-order inline bg-yellow-500 px-5 py-3 rounded-md text-white"
        >
          Go to Cart.
        </Link>
        <button
          onClick={placeOrder}
          className="place-order inline bg-green-500 px-5 py-3 rounded-md text-white"
          style={isVisble}
        >
          Place Order.
        </button>
      </div>
      <Footer />
    </>
  );
}

export default CheckOut;
