import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import axios from "../axios/axios.js";
import OrderItem from "./OrderItem";

function CheckOut() {
  const [placeButton, setPlaceButton] = useState(null);
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const house = useRef(null);
  const street = useRef(null);
  const landmark = useRef(null);
  const pincode = useRef(null);

  const formStyle = {
    display: loginUser.address ? "none" : "grid",
  };

  const isVisble = {
    display: placeButton ? "block" : "none",
  };

  function placeOrder() {
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
          console.log(res);
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((error) => console.log(error));
    } else {
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
          console.log(res);
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((error) => console.log(error));

      if (
        house.current.value &&
        landmark.current.value &&
        street.current.value &&
        pincode.current.value
      ) {
        alert("Order Placed Successfully.");
        navigate("/");
        removeFromCart([]);
        dispatch(removeFromCart([]));
      } else {
        alert("Please fill all the details");
        navigate("/checkout");
      }
    }
  }

  useEffect(() => {
    if (loginUser.order.length == 0) {
      setPlaceButton(false);
    } else {
      setPlaceButton(true);
    }
  }, []);

  console.log(loginUser.order.length);

  return (
    <>
      <div className="checkout border-2 m-2 p-5 min-h-screen">
        <div className="order">
          {loginUser.order.length > 0 ? (
            loginUser.order.map((item) => {
              return <OrderItem order={item} />;
            })
          ) : (
            <p className="text-center m-6">Your cart is empty.</p>
          )}
        </div>
        <p className="checkout-head text-center" style={formStyle}>
          To proceed, please add your delivery address.
        </p>

        <form className="form" style={formStyle}>
          <input
            ref={house}
            className="border border-slate-400 m-4 p-4 rounded-sm"
            type="text"
            placeholder="House / Flat / Plot Number."
          />
          <input
            ref={street}
            className="border border-slate-400 m-4 p-4 rounded-sm"
            type="text"
            placeholder="Street / Locality Name."
          />
          <input
            ref={landmark}
            className="border border-slate-400 m-4 p-4 rounded-sm"
            type="text"
            placeholder="Landmark"
          />
          <input
            ref={pincode}
            className="border border-slate-400 m-4 p-4 rounded-sm"
            type="number"
            placeholder="Pincode"
          />
        </form>

        <div className="w-full text-center h-max flex justify-center gap-3">
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
      </div>
      <Footer />
    </>
  );
}

export default CheckOut;
