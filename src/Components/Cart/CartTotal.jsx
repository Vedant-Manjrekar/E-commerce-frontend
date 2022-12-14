import React from "react";

function CartTotal({ amount }) {
  return (
    <div className="flex justify-between py-6 font-bold px-8 fixed bottom-0 bg-sky-200 w-full">
      <p>Total Amount</p>
      <p>$ {amount.toFixed(2)}</p>
    </div>
  );
}

export default CartTotal;
