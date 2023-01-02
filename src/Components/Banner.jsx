import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { SELECTED_PRODUCT } from "../assets/constants/constants";

function Banner() {
  const [banner, setBanner] = useState([]);

  // fetching products on refresh.
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=7", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => result.json())
      .then((json) => setBanner(json));
  }, []);

  // function to view product.
  function lookProduct(prod) {
    localStorage.removeItem(SELECTED_PRODUCT);

    const selectedItem = {
      title: prod.title,
      ratings: prod.rating.rate,
      price: prod.price,
      image: prod.image,
      description: prod.description,
      quantity: 1,
    };

    localStorage.setItem(SELECTED_PRODUCT, JSON.stringify(selectedItem));
  }

  return (
    <div className="banner w-stretch p-4 px-60 flex">
      <Swiper
        pagination={{}}
        navigation={true}
        modules={[Pagination, Navigation]}
        autoplay
        fadeEffect={true}
        className="mySwiper"
      >
        {banner.map((elem) => {
          return (
            <SwiperSlide className="flex justify-center" key={Math.random()}>
              <Link to="/selected-product">
                <img
                  key={Math.random()}
                  onClick={() => lookProduct(elem)}
                  src={elem.image}
                  loading="lazy"
                  className="banner_image"
                  alt="banner image"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Banner;
