import React from "react";
import "../App.css";
import Banner from "../Components/Banner";
import Categories from "../Components/Categories";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { useToggleAccountVisibility } from "../context/context";
import { LOGGED_USER } from "../assets/constants/constants";

function HomePage() {
  // custom hook.
  const removeAccount = useToggleAccountVisibility();

  // product states
  const [electronics, setElectronics] = useState([]);
  const [mensClothing, setMensClothing] = useState([]);
  const [womensClothing, setWomensCLothing] = useState([]);
  const [jewellery, setJewellery] = useState([]);

  // states to maintain user data.
  const [loginUser, setLoginUser] = useState(null);
  const [user, setUser] = useState(null);

  // fetches updated local state on reload.
  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem(LOGGED_USER)));
  }, []);

  // function to fetch different categories of products.
  function fetchCategory(categoryy) {
    fetch(`https://fakestoreapi.com/products/category/${categoryy}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (categoryy === "electronics") {
          setElectronics(data);
        } else if (categoryy === "men's clothing") {
          setMensClothing(data);
        } else if (categoryy === "women's clothing") {
          setWomensCLothing(data);
        } else if (categoryy === "jewelery") {
          setJewellery(data);
        }
      });
  }

  useEffect(() => {
    fetchCategory("electronics");
    fetchCategory("men's clothing");
    fetchCategory("women's clothing");
    fetchCategory("jewelery");

    if (JSON.parse(localStorage.getItem(LOGGED_USER)) == null) {
      setUser(false);
    } else if (
      JSON.parse(localStorage.getItem(LOGGED_USER)) == "User not found"
    ) {
      setUser(false);
    } else {
      setUser(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="App bg-white"
        id="app_main"
        onClick={() => removeAccount(false)}
      >
        {user ? (
          <p className="welcome h-max w-screen text-center py-6">
            Welcome {loginUser?.name}{" "}
          </p>
        ) : (
          <p className="welcome">'</p>
        )}
        <Banner />
        <Categories prod={mensClothing} name="Mens Wear" />
        <Categories prod={womensClothing} name="Female Fashion" />
        <Categories prod={electronics} name="Electronics" />
        <Categories prod={jewellery} name="Jewellery" />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
