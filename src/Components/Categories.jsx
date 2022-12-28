import React from "react";
import Product from "./Product";

function Categories({ prod, name }) {
  // console.log(prod[0].image);
  return (
    <>
      <p className="category-name pl-3 pt-3">{name}</p>
      <div className="category flex">
        {prod.map((elem) => {
          return <Product img={elem} key={Math.random()} />;
        })}
      </div>
    </>
  );
}

export default Categories;
