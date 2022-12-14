import React from "react";

function OrderItem({ order }) {
  return (
    <div className="order_item">
      {/* image */}
      <img src={order.image} className="order_image" alt="" />

      {/* Title */}
      <p className="font-bold">{order.title}</p>
      {/* Price */}
      <p className="text-lg">${order.price}</p>
    </div>
  );
}

export default OrderItem;
