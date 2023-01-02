import React, { useEffect, useState } from "react";
import { LOGGED_USER } from "../assets/constants/constants.js";
import axios from "../axios/axios.js";
import Navbar from "./Navbar.jsx";
import OrderItem from "./OrderItem.jsx";

function Orders() {
  // local user data
  const user = JSON.parse(localStorage.getItem(LOGGED_USER));
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios
      .post("/order", { email: user.email })
      .then((data) => {
        setOrder(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="orders">
        {order.final_order ? (
          order.final_order?.map((item) => <OrderItem order={item} />)
        ) : (
          <p>Your have no orders yet.</p>
        )}
      </div>
    </>
  );
}

export default Orders;
