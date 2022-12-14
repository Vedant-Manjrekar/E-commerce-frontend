import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../features/selectedSlice";
import { Link } from "react-router-dom";

function Banner() {
  const [banner, setBanner] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=5", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => result.json())
      .then((json) => setBanner(json));
  }, []);

  function lookProduct(prod) {
    console.log(prod);
    dispatch(removeProduct({}));

    const selectedItem = {
      title: prod.title,
      ratings: prod.rating.rate,
      price: prod.price,
      image: prod.image,
      description: prod.description,
      quantity: 1,
    };

    dispatch(addProduct(selectedItem));
  }

  // console.log(banner);

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
              <Link to="selected-product">
                <img
                  key={Math.random()}
                  onClick={() => lookProduct(elem)}
                  src={elem.image}
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
