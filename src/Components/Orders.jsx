import React, { useEffect, useState } from "react";
import axios from "../axios/axios.js";
import Navbar from "./Navbar.jsx";
import OrderItem from "./OrderItem.jsx";

function Orders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios
      .post("/order", { email: user.email })
      .then((data) => {
        setOrder(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(order);

  return (
    <div className="orders">
      <Navbar />
      {order.final_order ? (
        order.final_order?.map((item) => <OrderItem order={item} />)
      ) : (
        <p>Your have no orders yet.</p>
      )}
    </div>
  );
}

export default Orders;
