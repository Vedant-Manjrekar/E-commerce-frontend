import React, { useEffect } from "react";
import Product from "./Product";

function Categories({ prod, name }) {
  return (
    <>
      {/* Category name */}
      <p className="category-name pl-3 pt-3">{name}</p>

      {/* Product row */}
      <div className="category flex">
        {/* rendering products */}
        {prod.map((elem) => {
          return <Product img={elem} key={Math.random()} />;
        })}
      </div>
    </>
  );
}

export default Categories;
